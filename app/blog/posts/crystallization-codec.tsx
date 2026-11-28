import Image from "next/image";

export const crystallizationSlug = "compress-the-state-derive-the-rest";
export const crystallizationAssets = `/blog/${crystallizationSlug}`;

export const crystallizationSections = [
  { id: "independent-state", title: "Store the independent state" },
  { id: "compressor-and-representation", title: "Two effects measured separately" },
  { id: "matched-accuracy", title: "How much space buys the same accuracy?" },
  { id: "encode-decode-cost", title: "What encoding and decoding cost" },
  { id: "derive-or-project", title: "Why derive rather than project?" },
  { id: "how-we-measured", title: "How we measured" },
  { id: "audit-residuals", title: "How far did the 23-field codecs miss the audit limits?" },
];

const auditRows = [
  ["Energy closure", "0.03%", ["100% · 3,333×", 128], ["51.5% · 1,718×", 128], ["2.48 × 10⁻⁶% · 8.3 × 10⁻⁵×", 0]],
  ["Local total solute drift", "0.0002%", ["1.9% · 9,518×", 105], ["0.177% · 884×", 125], ["1.14 × 10⁻⁵% · 0.06×", 0]],
  ["Phase fraction from third moment", "0.0002%", ["12.5% · 62,413×", 128], ["0.105% · 527×", 128], ["1.09 × 10⁻⁵% · 0.05×", 0]],
  ["Crystal mass from phase fraction", "0.0002%", ["14% · 69,823×", 128], ["0.109% · 546×", 128], ["1.04 × 10⁻⁵% · 0.05×", 0]],
  ["Supersaturation identity", "2 × 10⁻⁵", ["0.236 · 11,802×", 128], ["0.00245 · 123×", 128], ["1.5 × 10⁻⁷ · 0.0074×", 0]],
  ["Moment inequality violation", "0.002%", ["200% · 100,000×", 128], ["200% · 100,000×", 128], ["0% · 0×", 0]],
  ["Velocity in solid cells", "10⁻⁷ m/s", ["0.0345 m/s · 345,169×", 128], ["0.00024 m/s · 2,441×", 128], ["0 m/s · 0×", 0]],
] as const;

export default function CrystallizationCodec() {
  return (
    <>
      <p>Simulations of how crystals grow can produce so much data that storing whole batches of runs becomes expensive. When we compressed each measurement separately, none of the 128 runs passed our physics checks at the tested size limit, even when the numerical errors looked small. We saved eight streams of key measurements and used the simulator’s equations to reconstruct the rest. At the same size limit all 128 runs passed, and at the same accuracy the new format used 25% less space with the same compression software.</p>

      <p>A reduced-order crystallization simulator writes 46 MiB of FP32 fields per trajectory. Many of its 23 fields depend on a smaller physical state and the process conditions, including phase fraction, crystal mass, dissolved solute, supersaturation, and the heat totals. We store only that state and rebuild the dependent fields at decode time. To measure the compressor and representation effects separately, we ran ZFP and SZ3 on both the original 23 fields and the eight stored coordinates.</p>

      <ul>
        <li><strong>128/128</strong> trajectories passed the physics audit at the 2 MiB cap with either coordinate codec. The corresponding 23-field codecs passed 0/128.</li>
        <li><strong>25% fewer bytes</strong> at matched accuracy with the same compressor.</li>
        <li><strong>0.75 MiB</strong> to match ZFP’s 2 MiB accuracy with SZ3 on the coordinates, with all audits passing.</li>
        <li><strong>0.41 s</strong> to decode and rebuild a trajectory with SZ3 on one CPU thread.</li>
      </ul>

      <h2 id="independent-state">Store the independent state</h2>

      <p>Each record stores the process conditions, 16 mean liquid temperatures, and eight compressed streams. These streams contain temperature deviations, crystallization heat, jacket-heat deviations, and five coordinates for the crystal-size moments. Nonnegative changes in log-moment slopes enforce the moment inequalities.</p>

      <p>The decoder derives phase fraction and crystal mass from the third moment, dissolved solute from the initial total mass, and saturation and the kinetic rates from the decoded state. At each saved interval, sensible heat minus crystallization heat sets the required jacket-heat total. The decoded deviations distribute that total across the liquid. The decoder enforces these identities without storing the dependent fields.</p>

      <figure>
        <Image src={`${crystallizationAssets}/temperature-slices.png`}
          alt="Reference and reconstructed temperature slices for the standard and shifted-condition splits in the 2 MiB ZFP comparison."
          width={1860} height={1088} sizes="(max-width: 760px) 88vw, 54vw" />
        <figcaption>Figure 1. Temperature on the first trajectory of each split, selected before scoring, at the ninth saved frame and central z slice, from the 2 MiB ZFP comparison. Colour and liquid-cell RMSE are comparable within each row. Pale grey marks solids.</figcaption>
      </figure>

      <h2 id="compressor-and-representation">Two effects measured separately</h2>

      <div role="region" aria-labelledby="crystallization-errors" tabIndex={0}>
        <table>
          <caption id="crystallization-errors">Results at the 2 MiB cap on 128 held-out trajectories. Error is p95 across trajectories, with mean and maximum taken over all 23 fields for each trajectory. The intervals use 12,000 paired bootstrap resamples stratified by split.</caption>
          <thead><tr><th scope="col">Setup</th><th scope="col">Median size</th><th scope="col">p95 mean-field error (95% CI)</th><th scope="col">p95 worst-field error (95% CI)</th><th scope="col">Physics audit</th></tr></thead>
          <tbody>
            <tr><th scope="row">ZFP, 23 fields</th><td>1.998 MiB</td><td>1.82% (1.76–1.91%)</td><td>2.62% (2.50–2.79%)</td><td>0/128</td></tr>
            <tr><th scope="row">SZ3, 23 fields</th><td>1.998 MiB</td><td>0.076% (0.068–0.087%)</td><td>0.13% (0.11–0.15%)</td><td>0/128</td></tr>
            <tr><th scope="row">ZFP, 8 coordinates</th><td>1.990 MiB</td><td>0.11% (0.099–0.12%)</td><td>0.66% (0.55–0.71%)</td><td>128/128</td></tr>
            <tr><th scope="row">SZ3, 8 coordinates</th><td>1.975 MiB</td><td>0.0034% (0.0026–0.0042%)</td><td>0.019% (0.015–0.024%)</td><td>128/128</td></tr>
          </tbody>
        </table>
      </div>

      <p>Each field’s RMSE is divided by the largest of its reference standard deviation, 1% of its median training standard deviation, and a small floor. On the original 23 fields, SZ3’s error was about 20–24 times lower than ZFP’s. With either compressor, the coordinate representation passed the physical checks by rebuilding dependent fields from the identities.</p>

      <p>Jacket heat was the worst field on 71 of 128 trajectories in the ZFP coordinate result. Its 0.66% worst-field p95 falls between a trajectory limited by crystallization heat (0.63%) and one limited by jacket heat (0.67%).</p>

      <h2 id="matched-accuracy">How much space buys the same accuracy?</h2>

      <figure>
        <Image src={`${crystallizationAssets}/rate-distortion.png`}
          alt="Log-log rate-distortion curves compare median serialized size against p95 mean-field and worst-field error for ZFP and SZ3 on fields and coordinates, with confidence bands."
          width={2275} height={975} sizes="(max-width: 760px) 88vw, 54vw" />
        <figcaption>Figure 2. Nine size caps from 0.25 to 4 MiB. The x-axis counts median serialized bytes actually used, including headers and any process record. Shading marks paired-bootstrap 95% intervals. Both axes are logarithmic. The 3 and 4 MiB SZ3 coordinate settings overlap because the tolerance ladder selected the same median size.</figcaption>
      </figure>

      <div role="region" aria-labelledby="crystallization-matched" tabIndex={0}>
        <table>
          <caption id="crystallization-matched">The smallest tested cap at which both coordinate-codec p95 scores met the same compressor’s 23-field scores at the 2 MiB cap. Sizes are actual medians.</caption>
          <thead><tr><th scope="col">Backend</th><th scope="col">23-field size</th><th scope="col">8-coordinate size at first match</th><th scope="col">Size ratio</th><th scope="col">Physics audit</th></tr></thead>
          <tbody>
            <tr><th scope="row">ZFP</th><td>1.998 MiB</td><td>1.492 MiB</td><td>1.34×</td><td>127/128</td></tr>
            <tr><th scope="row">SZ3</th><td>1.998 MiB</td><td>1.491 MiB</td><td>1.34×</td><td>128/128</td></tr>
          </tbody>
        </table>
      </div>

      <p>With the compressor held fixed, eight coordinates reached the same accuracy in 25% fewer bytes. Relative to ZFP on 23 fields at the 2 MiB cap, SZ3 on eight coordinates first matched at a median 0.497 MiB, with 127 of 128 audits passing. At 0.746 MiB, all 128 audits passed and the record was 2.7× smaller. Most of that size reduction came from switching compressors. SZ3 on the 23 fields also met the ZFP accuracy targets at about 0.75 MiB. At the 2 MiB cap, the independent 23-field SZ3 records failed the physics audit.</p>

      <p>At the tightest caps, ZFP on the coordinates can have higher field error than ZFP on all 23 fields, because rebuilding dependent fields propagates errors in the stored coordinates.</p>

      <h2 id="encode-decode-cost">What encoding and decoding cost</h2>

      <div role="region" aria-labelledby="crystallization-cost" tabIndex={0}>
        <table>
          <caption id="crystallization-cost">Medians and interquartile ranges per trajectory on 98 paired trajectories, using one CPU thread per process on one Intel Xeon Platinum 8480+ node. Settings rotated between trajectories. Fixed-tolerance encode and decode use the median of three warmed repeats per trajectory.</caption>
          <thead><tr><th scope="col">Setup, 2 MiB cap</th><th scope="col">Encode with rate search</th><th scope="col">Encode, tolerances known</th><th scope="col">Decode to 23 fields</th></tr></thead>
          <tbody>
            <tr><th scope="row">ZFP, 23 fields</th><td>8.28 s (7.56–8.68)</td><td>0.135 s (0.125–0.138)</td><td>0.119 s (0.104–0.123)</td></tr>
            <tr><th scope="row">SZ3, 23 fields</th><td>8.02 s (7.81–8.27)</td><td>0.231 s (0.219–0.241)</td><td>0.111 s (0.106–0.126)</td></tr>
            <tr><th scope="row">ZFP, 8 coordinates</th><td>3.61 s (3.26–3.84)</td><td>0.159 s (0.135–0.167)</td><td>0.419 s (0.343–0.440)</td></tr>
            <tr><th scope="row">SZ3, 8 coordinates</th><td>2.97 s (2.85–3.07)</td><td>0.211 s (0.198–0.220)</td><td>0.413 s (0.380–0.427)</td></tr>
          </tbody>
        </table>
      </div>

      <p>Rate search runs faster when it covers eight streams. Rebuilding the dependent fields raises decode time from about 0.1 s to 0.4 s.</p>

      <h2 id="derive-or-project">Why derive rather than project?</h2>

      <p>An earlier full-field projector changed all 128 exact simulator outputs while passing the audit, introducing a 1.12% p95 worst-field error before compression. The coordinate codec applies the identities during reconstruction, avoiding the error introduced by projecting all 23 decoded fields.</p>

      <p>At the 2 MiB cap, SZ3 on 23 fields had a p95 worst-field error of 0.13%. The same setup had a p95 energy-closure residual of 51.5% against a 0.03% limit. The audit uses the worst saved interval per trajectory.</p>

      <h2 id="how-we-measured">How we measured</h2>

      <ul>
        <li><strong>Data.</strong> We tested 64 standard and 64 shifted-condition trajectories from the reduced-order simulator, each with 16 frames and 23 fields on a 32³ grid. We regenerated the original FP32 targets and checked every input hash. Each compressor encoded a four-dimensional stream per field or coordinate.</li>
        <li><strong>Compressors.</strong> <a href="https://zfp.readthedocs.io/en/latest/modes.html">ZFP 1.0.1</a> and SZ3 3.4.0 (<a href="https://pypi.org/project/pysz/1.1.0/">pysz 1.1.0</a>) used absolute tolerances from the same power-of-two ladder, scaled for each stream. SZ3 used its interpolation/Lorenzo selection with OpenMP disabled. The allocator reduced the largest normalized stream error and used spare bytes for further reductions. We checked every stream’s worst absolute error against its requested tolerance before reconstruction.</li>
        <li><strong>Learned predictor.</strong> In an earlier 2 MiB ZFP ablation, a frozen process-conditioned predictor improved both error scores over direct coordinate coding on 18 of 128 trajectories. The size sweep uses direct coordinate coding and requires no shared model weights.</li>
        <li><strong>Scope.</strong> The benchmark covers this reduced-order simulator, its named physical checks, and a 32³ grid. The method requires the simulator equations linking the fields.</li>
        <li><strong>Related work.</strong> <a href="https://arxiv.org/abs/2111.02925">SZ3</a> introduced modular prediction-based error-bounded compression. Earlier work has also <a href="https://www.mdpi.com/2076-3417/12/13/6718">preserved derived quantities during compression</a>.</li>
      </ul>

      <h2 id="audit-residuals">How far did the 23-field codecs miss the audit limits?</h2>

      <p>We reran the 2 MiB configurations on CPU and verified input hashes, serialized sizes, and per-field RMSE against the original benchmark.</p>

      <div role="region" aria-labelledby="crystallization-audit" tabIndex={0}>
        <table>
          <caption id="crystallization-audit">Each entry shows the p95 across 128 per-trajectory maxima, its multiple of the audit limit, and the count above that limit.</caption>
          <thead><tr><th scope="col">Audit residual</th><th scope="col">Limit</th><th scope="col">ZFP, 23 fields</th><th scope="col">SZ3, 23 fields</th><th scope="col">SZ3, 8 coordinates</th></tr></thead>
          <tbody>
            {auditRows.map(([label, limit, ...results]) => (
              <tr key={label}>
                <th scope="row">{label}</th><td>{limit}</td>
                {results.map(([measurement, above], index) => (
                  <td key={index}>{measurement}<br />{above}/128 above limit</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>Energy closure divides the interval heat-balance gap by the larger magnitude of sensible heat change or integrated heat sources, with a 1 J floor. Mass drift is local and scaled by peak initial total solute concentration. The phase identities use the peak magnitude of the reconstructed field. Supersaturation uses absolute error. The moment-inequality residual can exceed 100% when compared products have opposite signs.</p>

      <p>The p95 of the largest absolute interval heat gap was 27.4 MJ for 23-field ZFP, 1.23 MJ for 23-field SZ3, and 0.0717 J for SZ3 on eight coordinates. The 1 J floor was inactive in every interval selected for the relative-energy statistic.</p>
    </>
  );
}
