"""Build the five two-page application briefs from the paired article source.
Run: node scripts/biotechnology/export_content.cjs | python3 scripts/biotechnology/build_whitepapers.py
Requires reportlab and pypdf. Optional BIOTECH_FONT_DIR selects the DejaVu font directory.
"""
import json, os, sys
from pathlib import Path
from html import escape
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pypdf import PdfReader
ROOT=Path(__file__).resolve().parents[2]
data=json.load(sys.stdin)
fontdir=Path(os.environ.get('BIOTECH_FONT_DIR','/usr/share/fonts/truetype/dejavu'))
for name,file in [('Body','DejaVuSans.ttf'),('Bold','DejaVuSans-Bold.ttf')]:pdfmetrics.registerFont(TTFont(name,str(fontdir/file)))
pdfmetrics.registerFontFamily('Body',normal='Body',bold='Bold',italic='Body',boldItalic='Bold')
NAVY=HexColor('#050552');INK=HexColor('#282e50');MUTED=HexColor('#555d7b');BLUE=HexColor('#eaf2fb');LINE=HexColor('#cad4e6')
W,H=595.276,841.89;M=42;CW=W-2*M;G=24;COL=(CW-G)/2
styles={
 'title':ParagraphStyle('title',fontName='Body',fontSize=24,leading=27.5,textColor=NAVY),
 'body':ParagraphStyle('body',fontName='Body',fontSize=9.5,leading=13.8,textColor=INK,spaceAfter=8),
 'small':ParagraphStyle('small',fontName='Body',fontSize=8,leading=11.2,textColor=MUTED),
 'head':ParagraphStyle('head',fontName='Bold',fontSize=12.4,leading=16,textColor=NAVY),
 'label':ParagraphStyle('label',fontName='Bold',fontSize=7.8,leading=10.5,textColor=MUTED),
 'node':ParagraphStyle('node',fontName='Bold',fontSize=9,leading=12,textColor=NAVY),
 'nodeSmall':ParagraphStyle('nodeSmall',fontName='Body',fontSize=7.5,leading=10,textColor=INK),
 'eq':ParagraphStyle('eq',fontName='Body',fontSize=12.4,leading=18,textColor=NAVY),
}
def clean(t):
 for a,b in [('—','-'),('–','-'),('‑','-'),('−','-'),('’',"'"),('“','"'),('”','"')]:t=t.replace(a,b)
 return t

def para(c,t,x,y,w,kind='body',gap=7,markup=False):
 p=Paragraph(t if markup else escape(clean(t)),styles[kind]);_,h=p.wrap(w,H);p.drawOn(c,x,y-h);return y-h-gap

def label(c,t,x,y,w=CW):return para(c,t.upper(),x,y,w,'label',7)
def heading(c,t,x,y,w=COL):return para(c,t,x,y,w,'head',9)
def block(c,title,paragraphs,x,y,w=COL):
 y=heading(c,title,x,y,w)
 for t in paragraphs:y=para(c,t,x,y,w)
 return y-7

def chrome(c,p,page):
 c.setFillColor(NAVY);c.rect(0,H-9,W,9,fill=1,stroke=0)
 c.setFont('Bold',12);c.drawString(M,H-39,'Shodh AI')
 c.setFillColor(MUTED);c.setFont('Body',8);c.drawRightString(W-M,H-37,f'BIOTECHNOLOGY / {p["number"]} OF 05')
 c.setStrokeColor(LINE);c.line(M,43,W-M,43)
 c.setFont('Body',7.7);c.drawString(M,29,f'LUCAN / {p["documentType"]} / September 2026')
 c.drawRightString(W-M,29,f'{page} / 2')
 c.setTitle(p['title']);c.setAuthor('Shodh AI');c.setSubject(p['dek'])

def diagram(c,p,y):
 y=label(c,'01 / Interacting physical scales',M,y)
 if p.get('pathways'):
  bw=(CW-18)/3
  for lane in p['pathways']:
   y=label(c,lane['name'],M,y)
   for i,stage in enumerate(lane['stages']):
    x=M+i*(bw+9);c.setFillColor(BLUE);c.roundRect(x,y-36,bw,36,5,fill=1,stroke=0)
    para(c,stage,x+8,y-7,bw-16,'node',0)
    if i<2:
     c.setStrokeColor(NAVY);c.line(x+bw+1,y-18,x+bw+8,y-18)
     c.line(x+bw+5,y-21,x+bw+8,y-18)
   y-=43
  y=para(c,'Distinct routes, not consecutive stages. Material interactions, transport and equipment constraints connect within each route.',M,y,CW,'small',6)
  return para(c,'Manufacturing and delivery requirements travel backward into composition and process design.',M,y,CW,'small',16)
 boxh=110;gap=9;bw=(CW-4*gap)/5
 for i,s in enumerate(p['scales']):
  x=M+i*(bw+gap);c.setFillColor(BLUE);c.roundRect(x,y-boxh,bw,boxh,7,fill=1,stroke=0)
  yy=label(c,f'{i+1:02}',x+9,y-9,bw-18)
  yy=para(c,s['name'],x+9,yy,bw-18,'node',6)
  yy=para(c,s['variable'],x+9,yy,bw-18,'nodeSmall',0)
  if yy<y-boxh+5:raise ValueError(f'Node overflow {p["slug"]}: {s["name"]}')
  if i<4:
   c.setStrokeColor(NAVY);c.line(x+bw+1,y-43,x+bw+gap-1,y-43);c.line(x+bw+gap-4,y-46,x+bw+gap-1,y-43)
 y-=boxh+12
 y=para(c,'Forward: physical consequences. Backward: manufacturing requirements constrain earlier choices.',M,y,CW,'small',5)
 captions={
 '01':'Conceptual antibody route. Other modalities require different biological models and operations.',
 '02':'CAR-T worked route. In vivo gene therapies have different products, process routes and quality attributes.',
 '03':'Local cell exposure connects biological demand to equipment settings; the return path expresses design constraints.',
 '04':'Product properties persist across operations, while each operation changes the product environment.',
 '05':'Protein purification and LNP assembly are distinct routes, not consecutive mandatory stages.'}
 y=para(c,captions[p['number']],M,y,CW,'small',16)
 return y

abstracts=[
'Biology moves forward across scales. Engineering has to reason backward across them. Manufacturing must become part of the biotechnology design problem. LUCAN is a cross-scale physical foundation model being built to connect molecular choices, living systems, processes and equipment around the product that must ultimately be made.',
'The future of cell therapy depends on manufacturing the right living product, repeatedly. CAR-T connects receptor design, cell behavior, expansion and device physics. LUCAN offers an architectural direction for reasoning across those scales; the proposed CAR-T couplings require their own product-specific validation.',
'Scale-up transfers a required biological environment into different equipment. LUCAN approaches that task through coupled physical prediction and inverse design: begin with the process specification, calculate candidate operating conditions, and verify them in the receiving system.',
'The best molecule is not necessarily the molecule with the best molecular score. The best process is not necessarily the process with the highest titer. The objective is the best final product. LUCAN is being built to bring binding, expression, recovery and formulation into a connected design problem.',
'A medicine is defined by what reaches the patient, not where production begins. Purification, formulation and delivery connect material interactions to equipment and use. Protein therapeutics and LNP delivery systems follow distinct routes; LUCAN is being built to reason across their respective physical scales.'
]
validation=[
'Define the target product, permitted interventions and equipment limits. Calibrate every cross-scale relationship with measured inputs. Hold out a process perturbation or geometry for prospective verification; report both prediction error and whether the proposed intervention achieved the required outcome.',
'Characterize starting material, track viable-cell trajectories and measure the intended product attributes. Test molecular-to-cell and environment-to-cell relationships separately before evaluating a coupled intervention. A CHO-cell mechanical surrogate is not evidence of CAR-T potency or vector quality.',
'Calibrate transport against measurements and couple it to measured biological demand. Verify proposals with an independent numerical method and physical process tests. Report the discrepancy and margin to acceptance limits, alongside the number of at-scale iterations required.',
'Compare candidates within a defined host, route and final format. Measure activity, self-association, expression and recovery where each mechanism matters. Prospectively challenge both candidate and process changes; a historical correlation is not evidence that an intervention will work.',
'Track recovery and quality through the actual sequence. Measure rheology under relevant conditions and verify pressure and handling in the chosen equipment. LNP applications need assembly and functional endpoints of their own. Predicted flow alone cannot establish stability, delivery efficacy or aseptic control.'
]
# Concise page-two summaries are paired with the fuller web articles.
model=[
'Use a shared representation to connect molecular descriptors, physical fields and measured biological response. Work backward from a manufacturing objective to permitted candidate and operating changes. Keep discrete choices such as host or route separate from continuous controls. Uncalibrated connections remain explicit uncertainties.',
'Connect receptor descriptors and measured cell-state models with expansion and device-specific transport. Search permitted design and process interventions against the intended living-cell product. For in vivo gene therapy, replace the CAR-T route with the relevant vector or delivery-system model; shared architecture does not imply shared biology.',
'Keep the process requirements separate from equipment geometry. Search admissible agitation, aeration and feed trajectories for the receiving vessel, including uncertainty margins. A new CAD file changes the physical calculation; transfer also requires the appropriate analytical, quality and facility work. Computational speed does not equal completed technology transfer.',
'Connect candidate descriptors to calibrated expression, culture and downstream relationships. Evaluate permitted sequence or route alternatives alongside continuous process controls. Optimize for recovered product meeting specification, rather than a single molecular score or harvest titer. Verify the mechanism that connects a proposed change to its manufacturing effect.',
'Connect feed composition and material interactions to separation, concentration and formulation models. Carry the resulting properties into equipment and device calculations. Search changes against recovery, handling and measured product requirements together. A protein-solution model and an LNP-assembly model require different calibration and verification.'
]
refs_short={
'lucan':'Shodh AI. LUCAN technical whitepaper v3, Sections 3-5.',
'car':'FDA. Considerations for CAR T Cell Products (2024).',
'gene':'FDA. CMC information for human gene therapy INDs (2020).',
'signaling':'Long et al. Nature Medicine (2015). doi:10.1038/nm.3838.',
'cfd':'Large-scale cell-culture CFD validation (2024). doi:10.1016/j.jbiotec.2024.02.006.',
'who':'WHO. Technology transfer guidelines, TRS 1044 Annex 4 (2022).',
'antibody':'Jain et al. PNAS (2017). doi:10.1073/pnas.1616408114.',
'lnp':'Mixing and mRNA-LNP performance (2026). doi:10.1038/s41467-026-72499-1.',
 'tff':'Live digital twin for single-pass TFF. doi:10.1002/btpr.70058.',
 'scale-note':'Background archive: earlier UNIPHY biomanufacturing overview.'}
for i,p in enumerate(data['pieces']):
 out=ROOT/'output/pdf'/f'{p["slug"]}.pdf';out.parent.mkdir(parents=True,exist_ok=True)
 c=canvas.Canvas(str(out),pagesize=(W,H));chrome(c,p,1)
 y=label(c,p['documentType'],M,H-66)
 y=para(c,p['title'],M,y,CW,'title',13)
 y=para(c,abstracts[i],M,y,CW,'body',18)
 y=diagram(c,p,y)
 x2=M+COL+G
 left=block(c,'The industry problem',[p['problem'],p['sections'][0]['paragraphs'][0]],M,y)
 interaction=p['sections'][1]['paragraphs'][1].replace('The reverse direction matters just as much. ', 'Manufacturing requirements also travel backward. ').replace('Now consider expansion. The ', 'During expansion, the ').replace('Mechanical exposure requires similar care. ', 'Mechanical exposure connects flow physics to cell response. ').replace('Likewise, a change', 'A change')
 left=block(c,'How the scales interact',[interaction],M,left)
 right=block(c,'What existing tools miss',[p['sections'][3 if p['number']=='05' else 2]['paragraphs'][0]],x2,y)
 # Application examples: newly authored sections occur at indexes 4 and 5.
 example=p['sections'][4] if p['number']!='02' else p['sections'][5]
 example_text=example['paragraphs'][0]
 right=block(c,'An engineering example',[example_text],x2,right)
 if min(left,right)<57:raise ValueError(f'Page 1 overflow {p["slug"]}: {left}, {right}')
 c.showPage();chrome(c,p,2)
 y=label(c,'02 / From model to manufacturing',M,H-66)
 y=para(c,p['shortTitle'],M,y,CW,'title',20)
 left=block(c,'The LUCAN approach',[model[i]],M,y)
 left=block(c,'Verification that matters',[validation[i]],M,left)
 right=heading(c,p['equation']['title'],x2,y)
 eq={'01':'x* = arg min J(Fθ(x))<br/>subject to g(Fθ(x), x) ≤ 0','02':'dN/dt = [μ(z, c) - k<sub>d</sub>(z, c)]N','03':'dC<sub>L</sub>/dt = k<sub>L</sub>a(C* - C<sub>L</sub>) - q<sub>O2</sub>X','04':'M<sub>recovered</sub> = V<sub>harvest</sub> × t<sub>harvest</sub> × ∏<sub>i</sub>Y<sub>i</sub>','05':'ΔP = 8ηLQ / (πr<super>4</super>)'}[p['number']]
 right=para(c,eq,x2,right,COL,'eq',12,True)
 right=para(c,p['equation']['explanation'],x2,right,COL)
 right=para(c,p['equation']['assumption'],x2,right,COL,'small',10)
 y=min(left,right)-7
 c.setStrokeColor(LINE);c.line(M,y,W-M,y);y-=16
 y=label(c,'Evidence and scope',M,y)
 evidence=p['evidence']
 if p['number']=='03': evidence='LUCAN v3 reports a monoclonal-antibody pilot; these are Shodh-reported results, not independent verification presented here. This paper supersedes the earlier public overview, retained as background material. No universal viability or transfer-time guarantee is made.'
 y=para(c,evidence,M,y,CW,'small',10)
 y=label(c,'Selected sources / linked references',M,y)
 for s in p['sources']:
  href=s['href'] if not s['href'].startswith('/') else 'https://shodh.ai'+s['href']
  text=f'<link href="{escape(href,quote=True)}" color="#050552">{escape(refs_short[s["id"]])}</link>'
  y=para(c,text,M,y,CW,'small',3,True)
 y-=7
 url='https://shodh.ai/biotechnology/'+p['slug']
 y=para(c,f'<link href="{url}" color="#050552">Full article: shodh.ai/biotechnology/{p["slug"]}</link>',M,y,CW,'small',8,True)
 y=heading(c,'What becomes possible',M,y-5,CW)
 commercial=[
 'Design molecules, processes and manufacturing systems together. Earlier visibility into recovery, formulation and equipment constraints can change candidate selection before expensive commitments are made. The opportunity is fewer dead ends and a development process organized around the finished product.',
 'Make the required cell product the design objective. Connecting receptor design, cell state and culture conditions could reveal incompatible choices before scarce starting material and facility time are committed. Successful characterized runs, usable capacity and predictable scheduling are the outcomes to earn.',
 'Make receiving-equipment decisions before learning their consequences through expensive production-scale iterations. Compare proposed operating regions, carry explicit requirements into the next facility and verify the chosen conditions. The commercial payoff is successful transfer with less development effort and reproducible quality.',
 'Judge progress by usable product. Candidate selection can account for recovery burden and final format; capacity planning can account for final output rather than harvest alone. Earlier visibility creates an opportunity to avoid late reformulation, redesign and equipment commitments that do not improve the medicine.',
 'Design each route all the way to the medicine. A delivery constraint can reshape formulation; a formulation requirement can change separation; a material interaction can return to candidate design. The opportunity is usable product manufactured repeatedly with its required attributes.'
 ]
 y=para(c,commercial[i],M,y,CW)
 y=para(c,'Measure: '+ '; '.join(p['consequence']['measures'])+'.',M,y,CW,'small',10)
 y=para(c,data['campaign'],M,y-3,CW,'head',0)
 if y<57:raise ValueError(f'Page 2 overflow {p["slug"]}: {y}')
 c.save()
 assert len(PdfReader(out).pages)==2
 dest=ROOT/'public/biotechnology/whitepapers'/out.name;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(out.read_bytes())
 print(f'{p["slug"]}: 2 pages; page 2 ends at {y:.1f}pt',file=sys.stderr)
