import svgPaths from "./svg-tts2ajevqy";
import imgImage from "figma:asset/36b3ea02c79f1e436da13fa580e9c19ed119a87a.png";
import imgImage1 from "figma:asset/c68326a4854b47ad08f6ab73bc47618ffefebe3a.png";
import imgImage2 from "figma:asset/4cc4470ca0744a47a9d5bfb581a831445126edb1.png";
import imgImage3 from "figma:asset/8899c9808f00564656a3e0de6878815d738cd496.png";
import imgImage4 from "figma:asset/f5b8517ecc5f2b979ee2dcb8852aa7c217b152c6.png";
import imgBackgroundOverlay from "figma:asset/811846e0e418ec0bbf8914e860efce5930208037.png";

function Link() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-[32.02px]">
        <p className="leading-[16px]">Home</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[7px] relative shrink-0 w-[4.317px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.31667 7">
        <g id="Container">
          <path d={svgPaths.p35022f90} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#11d411] text-[12px] w-[65.38px]">
        <p className="leading-[16px]">Marketplace</p>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Nav">
      <Link />
      <Container1 />
      <Container2 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[40px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[36px] tracking-[-0.9px] w-[398.89px]">
        <p className="leading-[40px]">Top Rated Avocado Lots</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[672px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[48px] justify-center leading-[24px] not-italic relative shrink-0 text-[#475569] text-[16px] w-[614.52px]">
        <p className="mb-0">Browse premium avocado batches verified by our advanced AI vision system. Every lot</p>
        <p>includes a full health and ripeness diagnostic report.</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[614.52px]" data-name="Container">
      <Heading1 />
      <Container5 />
    </div>
  );
}

function Container6() {
  return (
    <div className="relative shrink-0 size-[10.5px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 10.5">
        <g id="Container">
          <path d={svgPaths.p58a2200} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#0f172a] content-stretch flex gap-[7.99px] items-center px-[20px] py-[10px] relative rounded-[8px] shrink-0" data-name="Button">
      <Container6 />
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white w-[112.83px]">
        <p className="leading-[20px]">Advanced Filters</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <Button />
    </div>
  );
}

function BreadcrumbsHeader() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Breadcrumbs & Header">
      <Nav />
      <Container3 />
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[4.317px] relative shrink-0 w-[7px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 4.31667">
        <g id="Container">
          <path d={svgPaths.p1a9c9340} fill="var(--fill-0, #0F172A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center px-[17px] py-[9px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(17,212,17,0.2)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] text-center w-[82.22px]">
        <p className="leading-[20px]">Variety: Hass</p>
      </div>
      <Container8 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <Button1 />
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[4.317px] relative shrink-0 w-[7px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 4.31667">
        <g id="Container">
          <path d={svgPaths.p1a9c9340} fill="var(--fill-0, #0F172A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white content-stretch flex gap-[8.01px] items-center px-[17px] py-[9px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(17,212,17,0.2)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] text-center w-[147.09px]">
        <p className="leading-[20px]">Ripeness: Ready to Eat</p>
      </div>
      <Container10 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <Button2 />
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[4.317px] relative shrink-0 w-[7px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 4.31667">
        <g id="Container">
          <path d={svgPaths.p1a9c9340} fill="var(--fill-0, #0F172A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center px-[17px] py-[9px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(17,212,17,0.2)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] text-center w-[119.83px]">
        <p className="leading-[20px]">Quality: AI Certified</p>
      </div>
      <Container12 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <Button3 />
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[4.317px] relative shrink-0 w-[7px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 4.31667">
        <g id="Container">
          <path d={svgPaths.p1a9c9340} fill="var(--fill-0, #0F172A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white content-stretch flex gap-[7.99px] items-center px-[17px] py-[9px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(17,212,17,0.2)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] text-center w-[77.05px]">
        <p className="leading-[20px]">Price Range</p>
      </div>
      <Container14 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <Button4 />
    </div>
  );
}

function FiltersBar() {
  return (
    <div className="content-stretch flex gap-[12px] h-[38px] items-start relative shrink-0 w-full" data-name="Filters Bar">
      <Container7 />
      <Container9 />
      <Container11 />
      <Container13 />
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[10.5px] relative shrink-0 w-[11px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 10.5">
        <g id="Container">
          <path d={svgPaths.p3112c700} fill="var(--fill-0, #0F172A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background1() {
  return (
    <div className="absolute bg-[#facc15] content-stretch flex gap-[4px] items-center px-[12px] py-[4px] right-[12px] rounded-[9999px] top-[12px]" data-name="Background">
      <Container15 />
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[10px] tracking-[0.5px] uppercase w-[69.2px]">
        <p className="leading-[15px]">AI Platinum</p>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#f1f5f9] relative shrink-0 w-full z-[2]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[inherit] w-full">
        <div className="h-[254px] relative shrink-0 w-full" data-name="Image">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage} />
          </div>
        </div>
        <Background1 />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#11d411] text-[12px] tracking-[1.2px] uppercase w-[102.2px]">
        <p className="leading-[16px]">Hass Variety</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[55.27px]">
        <p className="leading-[20px]">$4.50/kg</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container18 />
      <Container19 />
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Margin">
      <Container17 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[22.5px] not-italic relative shrink-0 text-[#0f172a] text-[18px] w-full">
        <p className="mb-0">Premium Andean Lot</p>
        <p>#402</p>
      </div>
    </div>
  );
}

function Heading3Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Heading 3:margin">
      <Heading2 />
    </div>
  );
}

function Container21() {
  return (
    <div className="relative shrink-0 size-[9.333px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
        <g id="Container">
          <path d={svgPaths.p6d5e700} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Container">
      <Container21 />
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[132.27px]">
        <p className="leading-[20px]">Farmer: Juan Gomez</p>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16px] relative shrink-0 w-full" data-name="Margin">
      <Container20 />
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[13.333px] relative shrink-0 w-[10.667px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 13.3333">
        <g id="Container">
          <path d={svgPaths.p3d09b280} fill="var(--fill-0, #11D411)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex gap-[4px] items-center pr-[55.88px] relative shrink-0" data-name="Container">
      <Container25 />
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[32px] justify-center leading-[16px] not-italic relative shrink-0 text-[#475569] text-[12px] w-[58.67px]">
        <p className="mb-0">Antioquia,</p>
        <p>Colombia</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[29.44px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[32px] justify-center leading-[16px] not-italic relative shrink-0 text-[#f97316] text-[12px] w-[50.01px]">
        <p className="mb-0">Ripe in 2</p>
        <p>days</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container24 />
      <Container26 />
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#11d411] content-stretch flex flex-col items-center justify-center py-[12px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] text-center w-[94.89px]">
        <p className="leading-[20px]">Add to Inquiry</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <Container23 />
      <Button5 />
    </div>
  );
}

function Container16() {
  return (
    <div className="relative shrink-0 w-full z-[1]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-between p-[20px] relative w-full">
        <Margin />
        <Heading3Margin />
        <Margin1 />
        <Container22 />
      </div>
    </div>
  );
}

function LotCard() {
  return (
    <div className="absolute bg-white left-0 right-[864px] rounded-[12px] top-0" data-name="Lot Card 1">
      <div className="content-stretch flex flex-col isolate items-start overflow-clip p-px relative rounded-[inherit] w-full">
        <Background />
        <Container16 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(17,212,17,0.05)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[10.5px] relative shrink-0 w-[11px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 10.5">
        <g id="Container">
          <path d={svgPaths.p3112c700} fill="var(--fill-0, #334155)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background3() {
  return (
    <div className="absolute bg-[#e2e8f0] content-stretch flex gap-[4px] items-center px-[12px] py-[4px] right-[12px] rounded-[9999px] top-[12px]" data-name="Background">
      <Container27 />
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[10px] tracking-[0.5px] uppercase w-[45.17px]">
        <p className="leading-[15px]">AI Gold</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#f1f5f9] relative shrink-0 w-full z-[2]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[inherit] w-full">
        <div className="h-[254px] relative shrink-0 w-full" data-name="Image">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage1} />
          </div>
        </div>
        <Background3 />
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#11d411] text-[12px] tracking-[1.2px] uppercase w-[119.27px]">
        <p className="leading-[16px]">Fuerte Variety</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[55.27px]">
        <p className="leading-[20px]">$3.85/kg</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container30 />
      <Container31 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Margin">
      <Container29 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[18px] w-full">
        <p className="leading-[22.5px]">Select Export Batch B2</p>
      </div>
    </div>
  );
}

function Heading3Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Heading 3:margin">
      <Heading3 />
    </div>
  );
}

function Container33() {
  return (
    <div className="relative shrink-0 size-[9.333px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
        <g id="Container">
          <path d={svgPaths.p6d5e700} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Container">
      <Container33 />
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[122.14px]">
        <p className="leading-[20px]">Farmer: Maria Silva</p>
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16px] relative shrink-0 w-full" data-name="Margin">
      <Container32 />
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[13.333px] relative shrink-0 w-[10.667px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 13.3333">
        <g id="Container">
          <path d={svgPaths.p3d09b280} fill="var(--fill-0, #11D411)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <Container37 />
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[12px] w-[109.38px]">
        <p className="leading-[16px]">Michoacán, Mexico</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#16a34a] text-[12px] w-[72.69px]">
        <p className="leading-[16px]">Ready to Eat</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative w-full">
          <Container36 />
          <Container38 />
        </div>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#11d411] content-stretch flex flex-col items-center justify-center py-[12px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] text-center w-[94.89px]">
        <p className="leading-[20px]">Add to Inquiry</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <Container35 />
      <Button6 />
    </div>
  );
}

function Margin4() {
  return (
    <div className="content-stretch flex flex-col h-[110.5px] items-start justify-end min-h-[72px] pt-[38.5px] relative shrink-0 w-full" data-name="Margin">
      <Container34 />
    </div>
  );
}

function Container28() {
  return (
    <div className="relative shrink-0 w-full z-[1]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-between p-[20px] relative w-full">
        <Margin2 />
        <Heading3Margin1 />
        <Margin3 />
        <Margin4 />
      </div>
    </div>
  );
}

function LotCard1() {
  return (
    <div className="absolute bg-white left-[288px] right-[576px] rounded-[12px] top-0" data-name="Lot Card 2">
      <div className="content-stretch flex flex-col isolate items-start overflow-clip p-px relative rounded-[inherit] w-full">
        <Background2 />
        <Container28 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(17,212,17,0.05)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Container39() {
  return (
    <div className="h-[10.5px] relative shrink-0 w-[11px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 10.5">
        <g id="Container">
          <path d={svgPaths.p3112c700} fill="var(--fill-0, #0F172A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background5() {
  return (
    <div className="absolute bg-[#facc15] content-stretch flex gap-[4px] items-center px-[12px] py-[4px] right-[12px] rounded-[9999px] top-[12px]" data-name="Background">
      <Container39 />
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[10px] tracking-[0.5px] uppercase w-[69.2px]">
        <p className="leading-[15px]">AI Platinum</p>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#f1f5f9] relative shrink-0 w-full z-[2]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[inherit] w-full">
        <div className="h-[254px] relative shrink-0 w-full" data-name="Image">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage2} />
          </div>
        </div>
        <Background5 />
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#11d411] text-[12px] tracking-[1.2px] uppercase w-[107.75px]">
        <p className="leading-[16px]">Organic Hass</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[55.27px]">
        <p className="leading-[20px]">$5.20/kg</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container42 />
      <Container43 />
    </div>
  );
}

function Margin5() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Margin">
      <Container41 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[18px] w-full">
        <p className="leading-[22.5px]">Green Valley Organic A1</p>
      </div>
    </div>
  );
}

function Heading3Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Heading 3:margin">
      <Heading4 />
    </div>
  );
}

function Container45() {
  return (
    <div className="relative shrink-0 size-[9.333px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
        <g id="Container">
          <path d={svgPaths.p6d5e700} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Container">
      <Container45 />
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[159.22px]">
        <p className="leading-[20px]">Farmer: Valley Farms Co.</p>
      </div>
    </div>
  );
}

function Margin6() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16px] relative shrink-0 w-full" data-name="Margin">
      <Container44 />
    </div>
  );
}

function Container49() {
  return (
    <div className="h-[13.333px] relative shrink-0 w-[10.667px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 13.3333">
        <g id="Container">
          <path d={svgPaths.p3d09b280} fill="var(--fill-0, #11D411)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <Container49 />
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[12px] w-[87.36px]">
        <p className="leading-[16px]">California, USA</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#3b82f6] text-[12px] w-[98.67px]">
        <p className="leading-[16px]">Green / Long Life</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container48 />
      <Container50 />
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[#11d411] content-stretch flex flex-col items-center justify-center py-[12px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] text-center w-[94.89px]">
        <p className="leading-[20px]">Add to Inquiry</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <Container47 />
      <Button7 />
    </div>
  );
}

function Margin7() {
  return (
    <div className="content-stretch flex flex-col h-[110.5px] items-start justify-end min-h-[72px] pt-[38.5px] relative shrink-0 w-full" data-name="Margin">
      <Container46 />
    </div>
  );
}

function Container40() {
  return (
    <div className="relative shrink-0 w-full z-[1]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-between p-[20px] relative w-full">
        <Margin5 />
        <Heading3Margin2 />
        <Margin6 />
        <Margin7 />
      </div>
    </div>
  );
}

function LotCard2() {
  return (
    <div className="absolute bg-white left-[576px] right-[288px] rounded-[12px] top-0" data-name="Lot Card 3">
      <div className="content-stretch flex flex-col isolate items-start overflow-clip p-px relative rounded-[inherit] w-full">
        <Background4 />
        <Container40 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(17,212,17,0.05)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Container51() {
  return (
    <div className="h-[10.5px] relative shrink-0 w-[11px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 10.5">
        <g id="Container">
          <path d={svgPaths.p3112c700} fill="var(--fill-0, #C2410C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background7() {
  return (
    <div className="absolute bg-[#ffedd5] content-stretch flex gap-[3.99px] items-center px-[12px] py-[4px] right-[12px] rounded-[9999px] top-[12px]" data-name="Background">
      <Container51 />
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#c2410c] text-[10px] tracking-[0.5px] uppercase w-[52.66px]">
        <p className="leading-[15px]">AI Silver</p>
      </div>
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#f1f5f9] relative shrink-0 w-full z-[2]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[inherit] w-full">
        <div className="h-[254px] relative shrink-0 w-full" data-name="Image">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage3} />
          </div>
        </div>
        <Background7 />
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#11d411] text-[12px] tracking-[1.2px] uppercase w-[102.2px]">
        <p className="leading-[16px]">Hass Variety</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[55.27px]">
        <p className="leading-[20px]">$4.10/kg</p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container54 />
      <Container55 />
    </div>
  );
}

function Margin8() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Margin">
      <Container53 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[18px] w-full">
        <p className="leading-[22.5px]">Late Season Special Lot</p>
      </div>
    </div>
  );
}

function Heading3Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Heading 3:margin">
      <Heading5 />
    </div>
  );
}

function Container57() {
  return (
    <div className="relative shrink-0 size-[9.333px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
        <g id="Container">
          <path d={svgPaths.p6d5e700} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Container">
      <Container57 />
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[128.39px]">
        <p className="leading-[20px]">Farmer: Elena Rojas</p>
      </div>
    </div>
  );
}

function Margin9() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16px] relative shrink-0 w-full" data-name="Margin">
      <Container56 />
    </div>
  );
}

function Container61() {
  return (
    <div className="h-[13.333px] relative shrink-0 w-[10.667px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 13.3333">
        <g id="Container">
          <path d={svgPaths.p3d09b280} fill="var(--fill-0, #11D411)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <Container61 />
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[12px] w-[88.05px]">
        <p className="leading-[16px]">Jalisco, Mexico</p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#f97316] text-[12px] w-[74.03px]">
        <p className="leading-[16px]">Ripe in 1 day</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container60 />
      <Container62 />
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-[#11d411] content-stretch flex flex-col items-center justify-center py-[12px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] text-center w-[94.89px]">
        <p className="leading-[20px]">Add to Inquiry</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <Container59 />
      <Button8 />
    </div>
  );
}

function Margin10() {
  return (
    <div className="content-stretch flex flex-col h-[110.5px] items-start justify-end min-h-[72px] pt-[38.5px] relative shrink-0 w-full" data-name="Margin">
      <Container58 />
    </div>
  );
}

function Container52() {
  return (
    <div className="relative shrink-0 w-full z-[1]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-between p-[20px] relative w-full">
        <Margin8 />
        <Heading3Margin3 />
        <Margin9 />
        <Margin10 />
      </div>
    </div>
  );
}

function LotCard3() {
  return (
    <div className="absolute bg-white left-[864px] right-0 rounded-[12px] top-0" data-name="Lot Card 4">
      <div className="content-stretch flex flex-col isolate items-start overflow-clip p-px relative rounded-[inherit] w-full">
        <Background6 />
        <Container52 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(17,212,17,0.05)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Container63() {
  return (
    <div className="h-[10.5px] relative shrink-0 w-[11px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 10.5">
        <g id="Container">
          <path d={svgPaths.p3112c700} fill="var(--fill-0, #334155)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background9() {
  return (
    <div className="absolute bg-[#e2e8f0] content-stretch flex gap-[4px] items-center px-[12px] py-[4px] right-[12px] rounded-[9999px] top-[12px]" data-name="Background">
      <Container63 />
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#334155] text-[10px] tracking-[0.5px] uppercase w-[45.17px]">
        <p className="leading-[15px]">AI Gold</p>
      </div>
    </div>
  );
}

function Background8() {
  return (
    <div className="bg-[#f1f5f9] relative shrink-0 w-full z-[2]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[inherit] w-full">
        <div className="h-[254px] relative shrink-0 w-full" data-name="Image">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage4} />
          </div>
        </div>
        <Background9 />
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#11d411] text-[12px] tracking-[1.2px] uppercase w-[119.27px]">
        <p className="leading-[16px]">Fuerte Variety</p>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[55.27px]">
        <p className="leading-[20px]">$3.70/kg</p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container66 />
      <Container67 />
    </div>
  );
}

function Margin11() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Margin">
      <Container65 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[22.5px] not-italic relative shrink-0 text-[#0f172a] text-[18px] w-full">
        <p className="mb-0">Coastal Orchard Bulk</p>
        <p>Lot</p>
      </div>
    </div>
  );
}

function Heading3Margin4() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Heading 3:margin">
      <Heading6 />
    </div>
  );
}

function Container69() {
  return (
    <div className="relative shrink-0 size-[9.333px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
        <g id="Container">
          <path d={svgPaths.p6d5e700} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container68() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Container">
      <Container69 />
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[162.63px]">
        <p className="leading-[20px]">Farmer: Ricardo Mendoza</p>
      </div>
    </div>
  );
}

function Margin12() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16px] relative shrink-0 w-full" data-name="Margin">
      <Container68 />
    </div>
  );
}

function Container73() {
  return (
    <div className="h-[13.333px] relative shrink-0 w-[10.667px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 13.3333">
        <g id="Container">
          <path d={svgPaths.p3d09b280} fill="var(--fill-0, #11D411)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container72() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <Container73 />
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[12px] w-[61.36px]">
        <p className="leading-[16px]">Lima, Peru</p>
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#3b82f6] text-[12px] w-[119.39px]">
        <p className="leading-[16px]">Green / Fresh Picked</p>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container72 />
      <Container74 />
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-[#11d411] content-stretch flex flex-col items-center justify-center py-[12px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] text-center w-[94.89px]">
        <p className="leading-[20px]">Add to Inquiry</p>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <Container71 />
      <Button9 />
    </div>
  );
}

function Container64() {
  return (
    <div className="relative shrink-0 w-full z-[1]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-between p-[20px] relative w-full">
        <Margin11 />
        <Heading3Margin4 />
        <Margin12 />
        <Container70 />
      </div>
    </div>
  );
}

function LotCard5RepeatedForGridDensity() {
  return (
    <div className="absolute bg-white left-0 right-[864px] rounded-[12px] top-[525px]" data-name="Lot Card 5 (Repeated for Grid Density)">
      <div className="content-stretch flex flex-col isolate items-start overflow-clip p-px relative rounded-[inherit] w-full">
        <Background8 />
        <Container64 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(17,212,17,0.05)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function MarketplaceGrid() {
  return (
    <div className="h-[1002px] relative shrink-0 w-full" data-name="Marketplace Grid">
      <LotCard />
      <LotCard1 />
      <LotCard2 />
      <LotCard3 />
      <LotCard5RepeatedForGridDensity />
    </div>
  );
}

function Container75() {
  return (
    <div className="h-[12px] relative shrink-0 w-[7.4px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.4 12">
        <g id="Container">
          <path d={svgPaths.p3ed0080} fill="var(--fill-0, #0F172A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="content-stretch flex items-center justify-center p-px relative rounded-[8px] shrink-0 size-[40px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(17,212,17,0.2)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container75 />
    </div>
  );
}

function Button11() {
  return (
    <div className="bg-[#11d411] content-stretch flex items-center justify-center pb-[8.5px] pt-[7.5px] relative rounded-[8px] shrink-0 size-[40px]" data-name="Button">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[16px] text-center w-[8.91px]">
        <p className="leading-[24px]">1</p>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="content-stretch flex items-center justify-center pb-[8.5px] pt-[7.5px] px-px relative rounded-[8px] shrink-0 size-[40px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(17,212,17,0.2)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[16px] text-center w-[8.91px]">
        <p className="leading-[24px]">2</p>
      </div>
    </div>
  );
}

function Button13() {
  return (
    <div className="content-stretch flex items-center justify-center pb-[8.5px] pt-[7.5px] px-px relative rounded-[8px] shrink-0 size-[40px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(17,212,17,0.2)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[16px] text-center w-[8.91px]">
        <p className="leading-[24px]">3</p>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="content-stretch flex flex-col items-start px-[8px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[16px] w-[13.34px]">
        <p className="leading-[24px]">...</p>
      </div>
    </div>
  );
}

function Button14() {
  return (
    <div className="content-stretch flex items-center justify-center pb-[8.5px] pt-[7.5px] px-px relative rounded-[8px] shrink-0 size-[40px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(17,212,17,0.2)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[16px] text-center w-[17.8px]">
        <p className="leading-[24px]">12</p>
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="h-[12px] relative shrink-0 w-[7.4px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.4 12">
        <g id="Container">
          <path d={svgPaths.p28c84800} fill="var(--fill-0, #0F172A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button15() {
  return (
    <div className="content-stretch flex items-center justify-center p-px relative rounded-[8px] shrink-0 size-[40px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(17,212,17,0.2)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container77 />
    </div>
  );
}

function Pagination() {
  return (
    <div className="content-stretch flex gap-[16px] items-center justify-center pt-[32px] relative shrink-0 w-full" data-name="Pagination">
      <Button10 />
      <Button11 />
      <Button12 />
      <Button13 />
      <Container76 />
      <Button14 />
      <Button15 />
    </div>
  );
}

function Main() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[32px] items-start left-0 max-w-[1440px] px-[80px] py-[32px] right-0 top-[73px]" data-name="Main">
      <BreadcrumbsHeader />
      <FiltersBar />
      <MarketplaceGrid />
      <Pagination />
    </div>
  );
}

function Container80() {
  return (
    <div className="h-[16.992px] relative shrink-0 w-[16.995px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.9955 16.9923">
        <g id="Container">
          <path d={svgPaths.p12cee600} fill="var(--fill-0, #11D411)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container81() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#11d411] text-[14px] tracking-[-0.35px] w-[185.34px]">
        <p className="leading-[20px]">Avocado Marketplace Gallery</p>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="content-stretch flex gap-[12px] items-center opacity-70 relative shrink-0" data-name="Container">
      <Container80 />
      <Container81 />
    </div>
  );
}

function Container82() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-[477.13px]">
        <p className="leading-[16px]">© 2024 AvoMarket AI Technologies. All quality reports are powered by Neural-Avo Engine.</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[12px] w-[89.36px]">
        <p className="leading-[16px]">Terms of Service</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[12px] w-[74.69px]">
        <p className="leading-[16px]">Privacy Policy</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[12px] w-[64.03px]">
        <p className="leading-[16px]">Help Center</p>
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="content-stretch flex gap-[24px] h-[16px] items-start relative shrink-0" data-name="Container">
      <Link1 />
      <Link2 />
      <Link3 />
    </div>
  );
}

function Container78() {
  return (
    <div className="max-w-[1440px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between max-w-[inherit] relative w-full">
        <Container79 />
        <Container82 />
        <Container83 />
      </div>
    </div>
  );
}

function SimpleFooter() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Simple Footer">
      <div aria-hidden="true" className="absolute border-[rgba(17,212,17,0.1)] border-solid border-t inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[48px] pt-[49px] px-[80px] relative w-full">
        <Container78 />
      </div>
    </div>
  );
}

function SimpleFooterMargin() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 pt-[80px] right-0 top-[1473px]" data-name="Simple Footer:margin">
      <SimpleFooter />
    </div>
  );
}

function Container87() {
  return (
    <div className="h-[21.24px] relative shrink-0 w-[21.244px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.2443 21.2404">
        <g id="Container">
          <path d={svgPaths.p3f7ba400} fill="var(--fill-0, #11D411)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 1">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[20px] tracking-[-0.5px] w-[97.02px]">
        <p className="leading-[28px]">AvoMarket</p>
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Container87 />
      <Heading />
    </div>
  );
}

function Link4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#11d411] text-[14px] w-[80.94px]">
        <p className="leading-[20px]">Marketplace</p>
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[78.59px]">
        <p className="leading-[20px]">AI Diagnosis</p>
      </div>
    </div>
  );
}

function Link6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[49.02px]">
        <p className="leading-[20px]">My Lots</p>
      </div>
    </div>
  );
}

function Link7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[42.8px]">
        <p className="leading-[20px]">Orders</p>
      </div>
    </div>
  );
}

function Nav1() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="Nav">
      <Link4 />
      <Link5 />
      <Link6 />
      <Link7 />
    </div>
  );
}

function Container85() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="Container">
      <Container86 />
      <Nav1 />
    </div>
  );
}

function Container89() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip relative" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] w-full">
        <p className="leading-[normal]">Search avocado varieties...</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[rgba(17,212,17,0.1)] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pl-[40px] pr-[16px] py-[10px] relative w-full">
          <Container89 />
        </div>
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="absolute bottom-[16.67%] content-stretch flex flex-col items-start left-[12px] top-[16.67%]" data-name="Container">
      <div className="relative shrink-0 size-[18px]" data-name="Icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <path d={svgPaths.p8a35e00} fill="var(--fill-0, #11D411)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container88() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Container">
      <Input />
      <Container90 />
    </div>
  );
}

function Container92() {
  return (
    <div className="h-[20px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
        <g id="Container">
          <path d={svgPaths.p164b49c0} fill="var(--fill-0, #11D411)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button16() {
  return (
    <div className="bg-[rgba(17,212,17,0.1)] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[40px]" data-name="Button">
      <Container92 />
    </div>
  );
}

function BackgroundOverlay() {
  return (
    <div className="relative rounded-[9999px] shrink-0 size-[40px]" data-name="Background+Overlay">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[9999px]">
        <div className="absolute bg-[rgba(17,212,17,0.2)] inset-0 rounded-[9999px]" />
        <div className="absolute inset-0 overflow-hidden rounded-[9999px]">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgBackgroundOverlay} />
        </div>
      </div>
      <div className="-translate-y-1/2 absolute bg-[rgba(255,255,255,0)] left-0 rounded-[9999px] shadow-[0px_0px_0px_2px_rgba(17,212,17,0.2)] size-[40px] top-1/2" data-name="Overlay+Shadow" />
    </div>
  );
}

function Container91() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
      <Button16 />
      <BackgroundOverlay />
    </div>
  );
}

function Container84() {
  return (
    <div className="max-w-[1440px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center max-w-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between max-w-[inherit] pr-[0.02px] relative w-full">
          <Container85 />
          <Container88 />
          <Container91 />
        </div>
      </div>
    </div>
  );
}

function HeaderNavigation() {
  return (
    <div className="absolute backdrop-blur-[6px] bg-[rgba(246,248,246,0.8)] content-stretch flex flex-col items-start left-0 pb-[17px] pt-[16px] px-[80px] right-0 top-0" data-name="Header - Navigation">
      <div aria-hidden="true" className="absolute border-[rgba(17,212,17,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <Container84 />
    </div>
  );
}

function Container() {
  return (
    <div className="h-[1706px] mb-[-0.5px] min-h-[1706px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <Main />
      <SimpleFooterMargin />
      <HeaderNavigation />
    </div>
  );
}

export default function AvocadoMarketplaceGallery() {
  return (
    <div className="bg-[#f6f8f6] content-stretch flex flex-col items-start pb-[0.5px] relative size-full" data-name="Avocado Marketplace Gallery">
      <Container />
      <div className="h-[2.398px] mb-[-0.5px] relative shrink-0 w-[13.969px]" data-name="Icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9688 2.39844">
          <path d={svgPaths.p3c769180} fill="var(--fill-0, #0F172A)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}