import { notFound, permanentRedirect } from "next/navigation";
const legacy: Record<string, string> = {
  "molecule-to-manufacturing": "molecule-to-manufacturing", "car-t-manufacturing": "cell-gene-therapy",
  "scale-up-valley-of-death": "scale-up", "biologics-manufacturability": "biologics-manufacturing",
  "purification-formulation-delivery": "formulation-delivery"
};
export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(legacy).map(slug => ({ slug })); }
export default function Page({ params }: { params: { slug: string } }) {
  if (!legacy[params.slug]) notFound();
  permanentRedirect(`/biotechnology/${legacy[params.slug]}`);
}
