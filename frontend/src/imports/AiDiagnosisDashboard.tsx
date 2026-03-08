import svgPaths from "./svg-mbk96f6k11";
import imgImageBorder from "figma:asset/024edff67a9ea5ff26f1dc38c881f1390ecd774e.png";
import imgImageBackground from "figma:asset/94accacc7fbb5f40c0a1fd181ff88cf34390be6b.png";

function Container4() {
  return (
    <div className="h-[27.125px] relative shrink-0 w-[24.625px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.625 27.125">
        <g id="Container">
          <path d={svgPaths.p11265d80} fill="var(--fill-0, #11D411)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[23px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[18px] tracking-[-0.27px] w-[135.45px]">
        <p className="leading-[22.5px]">AvoDiagnose AI</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
      <Container4 />
      <Heading1 />
    </div>
  );
}

function Container6() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p8a35e00} fill="var(--fill-0, #11D411)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(17,212,17,0.1)] content-stretch flex h-full items-center justify-center pl-[16px] relative rounded-bl-[8px] rounded-tl-[8px] shrink-0" data-name="Overlay">
      <Container6 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute bottom-[10px] content-stretch flex flex-col items-start left-[8px] overflow-clip pr-[48.28px] top-[10px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(17,212,17,0.6)] w-[143.7px]">
        <p className="leading-[normal]">Search diagnosis...</p>
      </div>
    </div>
  );
}

function Container8() {
  return <div className="absolute bottom-[10px] left-[8px] top-[10px] w-[191.98px]" data-name="Container" />;
}

function Input() {
  return (
    <div className="bg-[rgba(17,212,17,0.1)] flex-[1_0_0] h-full min-h-px min-w-px overflow-clip relative rounded-br-[8px] rounded-tr-[8px]" data-name="Input">
      <Container7 />
      <Container8 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative rounded-[8px] w-full" data-name="Container">
      <Overlay />
      <Input />
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-col h-[40px] items-start justify-center max-w-[256px] min-w-[160px] relative shrink-0 w-[256px]" data-name="Label">
      <Container5 />
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[32px] items-center relative">
        <Container3 />
        <Label />
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[73.02px]">
        <p className="leading-[20px]">Dashboard</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[64.72px]">
        <p className="leading-[20px]">My Crops</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[83.3px]">
        <p className="leading-[20px]">Marketplace</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[52.05px]">
        <p className="leading-[20px]">Reports</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex gap-[36px] items-center relative self-stretch shrink-0" data-name="Container">
      <Link />
      <Link1 />
      <Link2 />
      <Link3 />
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[20px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
        <g id="Container">
          <path d={svgPaths.p164b49c0} fill="var(--fill-0, #0F172A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[rgba(17,212,17,0.1)] content-stretch flex h-[40px] items-center justify-center px-[10px] relative rounded-[8px] shrink-0" data-name="Button">
      <Container12 />
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[20px] relative shrink-0 w-[20.1px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.1 20">
        <g id="Container">
          <path d={svgPaths.p3cdadd00} fill="var(--fill-0, #0F172A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[rgba(17,212,17,0.1)] content-stretch flex h-[40px] items-center justify-center px-[10px] relative rounded-[8px] shrink-0" data-name="Button">
      <Container13 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex gap-[7.99px] items-start relative self-stretch shrink-0" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}

function Container9() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[32px] items-start justify-end relative w-full">
        <Container10 />
        <Container11 />
        <div className="pointer-events-none relative rounded-[9999px] shrink-0 size-[40px]" data-name="Image+Border">
          <div className="absolute inset-0 overflow-hidden rounded-[9999px]">
            <img alt="" className="absolute left-[5%] max-w-none size-[90%] top-[5%]" src={imgImageBorder} />
          </div>
          <div aria-hidden="true" className="absolute border-2 border-[#11d411] border-solid inset-0 rounded-[9999px]" />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="backdrop-blur-[6px] bg-[rgba(255,255,255,0.8)] relative shrink-0 w-full z-[2]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(17,212,17,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[13px] pt-[12px] px-[40px] relative w-full">
          <Container2 />
          <Container9 />
        </div>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[16px] w-full">
        <p className="leading-[24px]">Green Valley Farm</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#11d411] text-[12px] tracking-[0.6px] uppercase w-full">
        <p className="leading-[16px]">Premium Hass Producer</p>
      </div>
    </div>
  );
}

function BackgroundShadow() {
  return (
    <div className="bg-white relative rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-full" data-name="Background+Shadow">
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[16px] relative w-full">
        <Heading />
        <Container14 />
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p20793584} fill="var(--fill-0, #475569)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[63.55px]">
        <p className="leading-[20px]">Overview</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative w-full">
          <Container16 />
          <Container17 />
        </div>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p3d1fd080} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white w-[74.84px]">
        <p className="leading-[20px]">AI Scanner</p>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#11d411] relative rounded-[12px] shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative w-full">
          <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[12px] shadow-[0px_10px_15px_-3px_rgba(17,212,17,0.2),0px_4px_6px_-4px_rgba(17,212,17,0.2)]" data-name="Overlay+Shadow" />
          <Container18 />
          <Container19 />
        </div>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p22876fc0} fill="var(--fill-0, #475569)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[84.53px]">
        <p className="leading-[20px]">Crop History</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative w-full">
          <Container21 />
          <Container22 />
        </div>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[12px] relative shrink-0 w-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 12">
        <g id="Container">
          <path d={svgPaths.p33125000} fill="var(--fill-0, #475569)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[95.11px]">
        <p className="leading-[20px]">Yield Forecast</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative w-full">
          <Container24 />
          <Container25 />
        </div>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[18px] relative shrink-0 w-[20.094px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.0939 18">
        <g id="Container">
          <path d={svgPaths.p209d4440} fill="var(--fill-0, #475569)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[102.52px]">
        <p className="leading-[20px]">Market Listings</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative w-full">
          <Container27 />
          <Container28 />
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Nav">
      <Container15 />
      <Background />
      <Container20 />
      <Container23 />
      <Container26 />
    </div>
  );
}

function Container29() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1e293b] text-[12px] w-full">
          <p className="leading-[16px]">Storage Status</p>
        </div>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#e2e8f0] h-[6px] relative rounded-[9999px] shrink-0 w-full" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bg-[#11d411] inset-[0_55%_0_0]" data-name="Background" />
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[10px] w-full">
          <p className="leading-[15px]">450 of 1000 scans used this month</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full" data-name="Background+Border" style={{ backgroundImage: "linear-gradient(161.23deg, rgba(17, 212, 17, 0.1) 0%, rgba(17, 212, 17, 0.05) 100%)" }}>
      <div aria-hidden="true" className="absolute border border-[rgba(17,212,17,0.2)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[17px] relative w-full">
        <Container29 />
        <Background1 />
        <Container30 />
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="flex-[1_0_0] min-h-[87px] min-w-px relative w-full" data-name="Margin">
      <div className="flex flex-col justify-end min-h-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-end min-h-[inherit] pt-[508px] relative size-full">
          <BackgroundBorder />
        </div>
      </div>
    </div>
  );
}

function Aside() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative self-stretch shrink-0 w-[256px]" data-name="Aside">
      <BackgroundShadow />
      <Nav />
      <Margin />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[30px] tracking-[-0.75px] w-full">
        <p className="leading-[36px]">AI Health Diagnosis</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[672px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[24px] not-italic relative shrink-0 text-[#64748b] text-[16px] w-full">
        <p className="mb-0">Leverage computer vision to identify diseases, nutrient deficiencies, and</p>
        <p>pests in your avocado orchard instantly.</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Container33 />
    </div>
  );
}

function Overlay1() {
  return (
    <div className="h-[72px] relative shrink-0 w-[84px]" data-name="Overlay">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 84 72">
        <g id="Overlay">
          <rect fill="var(--fill-0, #11D411)" fillOpacity="0.1" height="72" rx="36" width="84" />
          <path d={svgPaths.p20ee8480} fill="var(--fill-0, #11D411)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col items-center max-w-[448px] pl-[10.67px] pr-[10.69px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[48px] justify-center leading-[24px] not-italic relative shrink-0 text-[#64748b] text-[16px] text-center w-[426.64px]">
        <p className="mb-0">Take a clear photo of leaves, fruit, or the trunk. Supports</p>
        <p>high-res JPG and PNG formats.</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-center relative">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[20px] text-center w-[256.66px]">
          <p className="leading-[28px]">Drop avocado photos here</p>
        </div>
        <Container36 />
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#11d411] h-[48px] min-w-[160px] relative rounded-[12px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center justify-center min-w-[inherit] px-[35.25px] relative">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white w-[89.5px]">
          <p className="leading-[24px]">Select Files</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(17,212,17,0.3)] border-dashed inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-center justify-center px-[26px] py-[82px] relative w-full">
          <Overlay1 />
          <Container35 />
          <Button2 />
        </div>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="h-[16.667px] relative shrink-0 w-[15.843px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.8431 16.6667">
        <g id="Container">
          <path d={svgPaths.p1c27d380} fill="var(--fill-0, #11D411)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Overlay2() {
  return (
    <div className="bg-[rgba(17,212,17,0.1)] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[32px]" data-name="Overlay">
      <Container39 />
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[16px] w-[212.41px]">
        <p className="leading-[24px]">AI Processing Scan #842...</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Overlay2 />
      <Container40 />
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#11d411] text-[14px] w-[31.86px]">
        <p className="leading-[20px]">75%</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative w-full">
        <Container38 />
        <Container41 />
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#f1f5f9] h-[12px] relative rounded-[9999px] shrink-0 w-full" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bg-[#11d411] bottom-0 left-0 right-1/4 rounded-[9999px] top-0" data-name="Background" />
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="relative shrink-0 size-[8px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
        <g id="Container">
          <path d={svgPaths.p181ccb00} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container42() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative w-full">
        <Container43 />
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-[334.91px]">
          <p className="leading-[16px]">Scanning for Phytophthora, Thrips, and Nitrogen markers...</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorderShadow() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[#f1f5f9] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[25px] relative w-full">
        <Container37 />
        <Background2 />
        <Container42 />
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Container">
      <BackgroundBorder1 />
      <BackgroundBorderShadow />
    </div>
  );
}

function Heading3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[12px] tracking-[1.2px] uppercase w-full">
          <p className="leading-[16px]">Recent Scan Detail</p>
        </div>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-full">
          <p className="leading-[20px]">IMG_2023_Avocado_Hass_01.jpg</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[16px] self-stretch" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#f1f5f9] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[25px] relative size-full">
        <Heading3 />
        <div className="aspect-video relative rounded-[12px] shrink-0 w-full" data-name="Image+Background">
          <div aria-hidden="true" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 pointer-events-none rounded-[12px]">
            <div className="absolute bg-[#f1f5f9] bg-clip-padding border-0 border-[transparent] border-solid inset-0 rounded-[12px]" />
            <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden rounded-[12px]">
              <img alt="" className="absolute h-[177.77%] left-0 max-w-none top-[-38.89%] w-full" src={imgImageBackground} />
            </div>
          </div>
        </div>
        <Container45 />
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="h-[25px] relative shrink-0 w-[18.75px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.75 25">
        <g id="Container">
          <path d={svgPaths.pef7800} fill="var(--fill-0, #D97706)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#fef3c7] relative rounded-[9999px] shrink-0 size-[64px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Container46 />
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="relative shrink-0" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[16px] text-center w-[55.2px]">
          <p className="leading-[24px]">Pro Tip</p>
        </div>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center px-[7.19px] relative">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[60px] justify-center leading-[20px] not-italic relative shrink-0 text-[#64748b] text-[14px] text-center w-[215.62px]">
          <p className="mb-0">Ensure the leaf is well-lit and not</p>
          <p className="mb-0">in shadow for the highest AI</p>
          <p>confidence scores.</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder3() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[16px] self-stretch" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#f1f5f9] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-center justify-center p-[25px] relative size-full">
          <Background3 />
          <Heading4 />
          <Container47 />
        </div>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex gap-[16px] h-[247.375px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <BackgroundBorder2 />
      <BackgroundBorder3 />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px min-w-px relative self-stretch" data-name="Container">
      <Container32 />
      <Container34 />
      <Container44 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[18px] w-[156.55px]">
        <p className="leading-[28px]">Diagnosis Results</p>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#fef3c7] content-stretch flex flex-col items-start px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#b45309] text-[10px] uppercase w-[45.34px]">
        <p className="leading-[15px]">Pending</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative w-full">
        <Heading5 />
        <Background4 />
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p39d1a2c0} fill="var(--fill-0, #11D411)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Overlay3() {
  return (
    <div className="bg-[rgba(17,212,17,0.1)] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[40px]" data-name="Overlay">
      <Container51 />
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-[103.16px]">
        <p className="leading-[16px]">Primary Condition</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[16px] w-[140.56px]">
        <p className="leading-[24px]">Requires Nitrogen</p>
      </div>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#f1f5f9] h-[6px] overflow-clip relative rounded-[9999px] shrink-0 w-[96px]" data-name="Background">
      <div className="absolute bg-[#11d411] inset-[0_8.01%_0_0]" data-name="Background" />
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#11d411] text-[10px] w-[82.19px]">
        <p className="leading-[15px]">92% Confidence</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex gap-[8px] items-center pt-[4px] relative shrink-0 w-full" data-name="Container">
      <Background5 />
      <Container56 />
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[186.19px]" data-name="Container">
      <Container53 />
      <Container54 />
      <Container55 />
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Overlay3 />
      <Container52 />
    </div>
  );
}

function Container57() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-full">
          <p className="leading-[20px]">Recommended Actions</p>
        </div>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="h-[17px] relative shrink-0 w-[15px]" data-name="Margin">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 17">
        <g id="Margin">
          <path d={svgPaths.p37616a00} fill="var(--fill-0, #11D411)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[1.98px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[32px] justify-center leading-[16px] not-italic relative shrink-0 text-[#475569] text-[12px] w-[238.02px]">
        <p className="mb-0">Apply slow-release Nitrogen-rich fertilizer</p>
        <p>(e.g., Urea) to the root zone.</p>
      </div>
    </div>
  );
}

function Item() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="Item">
      <Margin1 />
      <Container58 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="h-[17px] relative shrink-0 w-[15px]" data-name="Margin">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 17">
        <g id="Margin">
          <path d={svgPaths.p37616a00} fill="var(--fill-0, #11D411)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[12.98px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[32px] justify-center leading-[16px] not-italic relative shrink-0 text-[#475569] text-[12px] w-[227.02px]">
        <p className="mb-0">Increase irrigation frequency by 15% for</p>
        <p>the next 10 days.</p>
      </div>
    </div>
  );
}

function Item1() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="Item">
      <Margin2 />
      <Container59 />
    </div>
  );
}

function Margin3() {
  return (
    <div className="h-[17px] relative shrink-0 w-[15px]" data-name="Margin">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 17">
        <g id="Margin">
          <path d={svgPaths.p24968d00} fill="var(--fill-0, #CBD5E1)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[26.3px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[32px] justify-center leading-[16px] not-italic relative shrink-0 text-[#475569] text-[12px] w-[213.7px]">
        <p className="mb-0">Re-scan in 2 weeks to monitor foliage</p>
        <p>color improvement.</p>
      </div>
    </div>
  );
}

function Item2() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="Item">
      <Margin3 />
      <Container60 />
    </div>
  );
}

function List() {
  return (
    <div className="relative shrink-0 w-full" data-name="List">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start relative w-full">
        <Item />
        <Item1 />
        <Item2 />
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start pt-[25px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#f8fafc] border-solid border-t inset-0 pointer-events-none" />
      <Container57 />
      <List />
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#0f172a] content-stretch flex flex-col items-center justify-center py-[12px] relative rounded-[12px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white w-[140.2px]">
        <p className="leading-[20px]">Save to Crop History</p>
      </div>
    </div>
  );
}

function ButtonMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-name="Button:margin">
      <Button3 />
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-px py-[13px] relative rounded-[12px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[14px] text-center w-[125.05px]">
        <p className="leading-[20px]">Export PDF Report</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start relative w-full">
        <Container50 />
        <HorizontalBorder />
        <ButtonMargin />
        <Button4 />
      </div>
    </div>
  );
}

function BackgroundBorder4() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#f1f5f9] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[25px] relative w-full">
        <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[16px] shadow-[0px_20px_25px_-5px_rgba(226,232,240,0.5),0px_8px_10px_-6px_rgba(226,232,240,0.5)]" data-name="Overlay+Shadow" />
        <Container48 />
        <Container49 />
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="h-[12px] relative shrink-0 w-[16.5px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 12">
        <g id="Container">
          <path d={svgPaths.p3566dee0} fill="var(--fill-0, #11D411)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative w-full">
        <Container61 />
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[98.98px]">
          <p className="leading-[20px]">Logistics Alert</p>
        </div>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[19.5px] not-italic relative shrink-0 text-[#64748b] text-[12px] w-full">
          <p className="mb-0">3 high-quality Hass lots are ready for the</p>
          <p className="mb-0">marketplace. High demand in European</p>
          <p>markets this week.</p>
        </div>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="relative shrink-0 size-[8px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
        <g id="Container">
          <path d={svgPaths.p20314340} fill="var(--fill-0, #11D411)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Link4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#11d411] text-[12px] w-[149.36px]">
          <p className="leading-[16px]">View Marketplace Trends</p>
        </div>
        <Container63 />
      </div>
    </div>
  );
}

function BackgroundBorder5() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#f1f5f9] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[25px] relative w-full">
        <Heading6 />
        <Container62 />
        <Link4 />
      </div>
    </div>
  );
}

function Aside1() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative self-stretch shrink-0 w-[320px]" data-name="Aside">
      <BackgroundBorder4 />
      <BackgroundBorder5 />
    </div>
  );
}

function Main() {
  return (
    <div className="h-[1049.375px] max-w-[1440px] relative shrink-0 w-full z-[1]" data-name="Main">
      <div className="content-stretch flex gap-[24px] items-start max-w-[inherit] p-[40px] relative size-full">
        <Aside />
        <Container31 />
        <Aside1 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col isolate items-start relative shrink-0 w-full" data-name="Container">
      <Header />
      <Main />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center min-h-[1136px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container1 />
    </div>
  );
}

export default function AiDiagnosisDashboard() {
  return (
    <div className="bg-[#f6f8f6] content-stretch flex flex-col items-start relative size-full" data-name="AI Diagnosis Dashboard">
      <Container />
    </div>
  );
}