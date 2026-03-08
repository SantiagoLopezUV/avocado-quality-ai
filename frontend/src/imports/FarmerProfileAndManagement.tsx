import svgPaths from "./svg-x0j5qg0j0w";
import imgImageBorder from "figma:asset/82ec222d46b4fa6b8787818a89520bd509e1733f.png";
import imgBackgroundBorder from "figma:asset/638a5812974ecf1ddf0d1aa4e1dbadf90005898e.png";
import imgBackground from "figma:asset/d4e44e6615dd600384751eb369cf952287b207c0.png";
import imgImage from "figma:asset/d8e562a1e092e1ddb6391a269e48be0295b511ad.png";
import imgImage1 from "figma:asset/5ef62d8ab48d71c3f6db6dd0dff726635ae6de69.png";
import imgImage2 from "figma:asset/607a81304df2785ec67d98b6cadfdbe29861cb62.png";

function Svg() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="SVG">
          <path clipRule="evenodd" d={svgPaths.p11b38d00} fill="var(--fill-0, #11D411)" fillRule="evenodd" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p13684fc0} fill="var(--fill-0, #11D411)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[32px]" data-name="Container">
      <Svg />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] h-[23px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[18px] tracking-[-0.27px] w-[101.22px]">
        <p className="leading-[22.5px]">AvoGuard AI</p>
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
    <div className="bg-[rgba(17,212,17,0.1)] content-stretch flex h-full items-center justify-center mr-[-0.01px] pl-[16px] relative rounded-bl-[8px] rounded-tl-[8px] shrink-0" data-name="Overlay">
      <Container6 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute bottom-[11px] content-stretch flex flex-col items-start left-[8px] overflow-clip pr-[75.14px] top-[11px]" data-name="Container">
      <div className="flex flex-col font-['Liberation_Serif:Regular',sans-serif] h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(17,212,17,0.6)] w-[116.84px]">
        <p className="leading-[normal]">Search farm IDs...</p>
      </div>
    </div>
  );
}

function Container8() {
  return <div className="absolute bottom-[11px] left-[8px] top-[11px] w-[191.98px]" data-name="Container" />;
}

function Input() {
  return (
    <div className="bg-[rgba(17,212,17,0.1)] flex-[1_0_0] h-full min-h-px min-w-px mr-[-0.01px] overflow-clip relative rounded-br-[8px] rounded-tr-[8px]" data-name="Input">
      <Container7 />
      <Container8 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px pr-[0.01px] relative rounded-[8px] w-full" data-name="Container">
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
      <div className="flex flex-col font-['Liberation_Serif:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[60.66px]">
        <p className="leading-[20px]">Dashboard</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#11d411] text-[14px] w-[57.16px]">
        <p className="leading-[20px]">My Farm</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Liberation_Serif:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[69.97px]">
        <p className="leading-[20px]">Marketplace</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Liberation_Serif:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[53.66px]">
        <p className="leading-[20px]">Analytics</p>
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
    <div className="content-stretch flex gap-[8px] items-start relative self-stretch shrink-0" data-name="Container">
      <Button />
      <Button1 />
      <div className="pointer-events-none relative rounded-[9999px] shrink-0 size-[40px]" data-name="Image+Border">
        <div className="absolute inset-0 overflow-hidden rounded-[9999px]">
          <img alt="" className="absolute left-[5%] max-w-none size-[90%] top-[5%]" src={imgImageBorder} />
        </div>
        <div aria-hidden="true" className="absolute border-2 border-[#11d411] border-solid inset-0 rounded-[9999px]" />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="flex-[1_0_0] h-[40px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[32px] items-start justify-end relative size-full">
        <Container10 />
        <Container11 />
      </div>
    </div>
  );
}

function NavigationHeader() {
  return (
    <div className="bg-[#f6f8f6] relative shrink-0 w-full" data-name="Navigation Header">
      <div aria-hidden="true" className="absolute border-[rgba(17,212,17,0.2)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[13px] pt-[12px] px-[40px] relative w-full">
          <Container2 />
          <Container9 />
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="min-h-[128px] relative rounded-[12px] shrink-0 size-[128px]" data-name="Background+Border">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[12px]">
        <img alt="" className="absolute left-[3.13%] max-w-none size-[93.75%] top-[3.13%]" src={imgBackgroundBorder} />
      </div>
      <div aria-hidden="true" className="absolute border-4 border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="absolute bg-[rgba(255,255,255,0)] bottom-0 left-0 rounded-[12px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] top-0 w-[128px]" data-name="Overlay+Shadow" />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[30px] tracking-[-0.75px] w-[213.81px]">
        <p className="leading-[36px]">Carlos Rodriguez</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[11.667px] relative shrink-0 w-[9.333px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 11.6667">
        <g id="Container">
          <path d={svgPaths.p3d8f00c0} fill="var(--fill-0, #11D411)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#11d411] text-[16px] w-[337.25px]">
        <p className="leading-[24px]">Green Valley Organic Farm • Michoacán, Mexico</p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-full" data-name="Margin">
      <Container16 />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Serif:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-full">
        <p className="leading-[20px]">Member since March 2021 • Verified Producer</p>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-full" data-name="Margin">
      <Container18 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[213.81px]" data-name="Container">
      <Heading />
      <Margin />
      <Margin1 />
    </div>
  );
}

function Container14() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-center relative">
        <BackgroundBorder />
        <Container15 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.pad10a80} fill="var(--fill-0, #11D411)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[8px] relative shrink-0" data-name="Margin">
      <Container20 />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[rgba(17,212,17,0.1)] content-stretch flex h-[40px] items-center justify-center px-[24px] relative rounded-[8px] shrink-0" data-name="Button">
      <Margin2 />
      <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#11d411] text-[16px] text-center w-[79.25px]">
        <p className="leading-[24px]">Edit Profile</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[21px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 21">
        <g id="Container">
          <path d={svgPaths.p394dd500} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[8px] relative shrink-0" data-name="Margin">
      <Container21 />
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#11d411] content-stretch flex h-[40px] items-center justify-center px-[24px] relative rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0" data-name="Button">
      <Margin3 />
      <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white w-[89.63px]">
        <p className="leading-[24px]">Share Profile</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-start relative">
        <Button2 />
        <Button3 />
      </div>
    </div>
  );
}

function ProfileHeaderSection() {
  return (
    <div className="content-stretch flex items-end justify-between pb-[33px] relative shrink-0 w-full" data-name="Profile Header Section">
      <div aria-hidden="true" className="absolute border-[rgba(17,212,17,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <Container14 />
      <Container19 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative w-full">
        <div className="flex flex-col font-['Liberation_Serif:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] tracking-[0.7px] uppercase w-[128.23px]">
          <p className="leading-[20px]">Total Analyses</p>
        </div>
        <div className="h-[21px] relative shrink-0 w-[20px]" data-name="Icon">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 21">
            <path d={svgPaths.p15e38e00} fill="var(--fill-0, #11D411)" id="Icon" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[30px] w-full">
          <p className="leading-[36px]">142</p>
        </div>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[7px] relative shrink-0 w-[11.667px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 7">
        <g id="Container">
          <path d={svgPaths.pde19380} fill="var(--fill-0, #059669)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container23() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative w-full">
        <Container24 />
        <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#059669] text-[14px] w-[103.67px]">
          <p className="leading-[20px]">+12% this month</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorderShadow() {
  return (
    <div className="bg-white relative rounded-[12px] self-stretch shrink-0 w-[357.33px]" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[rgba(17,212,17,0.2)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[25px] relative size-full">
        <Paragraph />
        <Container22 />
        <Container23 />
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative w-full">
        <div className="flex flex-col font-['Liberation_Serif:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] tracking-[0.7px] uppercase w-[146.56px]">
          <p className="leading-[20px]">Avg Health Score</p>
        </div>
        <div className="h-[20px] relative shrink-0 w-[16px]" data-name="Icon">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
            <path d={svgPaths.p15aec574} fill="var(--fill-0, #11D411)" id="Icon" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[30px] w-full">
          <p className="leading-[36px]">94%</p>
        </div>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[7px] relative shrink-0 w-[11.667px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 7">
        <g id="Container">
          <path d={svgPaths.pde19380} fill="var(--fill-0, #059669)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container26() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3.99px] items-center relative w-full">
        <Container27 />
        <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#059669] text-[14px] w-[112.33px]">
          <p className="leading-[20px]">+2% improvement</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorderShadow1() {
  return (
    <div className="bg-white relative rounded-[12px] self-stretch shrink-0 w-[357.33px]" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[rgba(17,212,17,0.2)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[25px] relative size-full">
        <Paragraph1 />
        <Container25 />
        <Container26 />
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative w-full">
        <div className="flex flex-col font-['Liberation_Serif:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] tracking-[0.7px] uppercase w-[127.55px]">
          <p className="leading-[20px]">Active Listings</p>
        </div>
        <div className="h-[18px] relative shrink-0 w-[20.094px]" data-name="Icon">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.0939 18">
            <path d={svgPaths.p209d4440} fill="var(--fill-0, #11D411)" id="Icon" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[30px] w-full">
          <p className="leading-[36px]">8</p>
        </div>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <div className="flex flex-col font-['Liberation_Serif:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[14px] w-[117.04px]">
          <p className="leading-[20px]">No change this week</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorderShadow2() {
  return (
    <div className="bg-white relative rounded-[12px] self-stretch shrink-0 w-[357.34px]" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[rgba(17,212,17,0.2)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[25px] relative size-full">
        <Paragraph2 />
        <Container28 />
        <Container29 />
      </div>
    </div>
  );
}

function StatsOverview() {
  return (
    <div className="content-stretch flex gap-[24px] h-[143px] items-start justify-center relative shrink-0 w-full" data-name="Stats Overview">
      <BackgroundBorderShadow />
      <BackgroundBorderShadow1 />
      <BackgroundBorderShadow2 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 3">
      <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[18px] w-[73.5px]">
        <p className="leading-[28px]">Farm Bio</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <div className="flex flex-col font-['Liberation_Serif:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#11d411] text-[14px] text-center w-[23.34px]">
        <p className="leading-[20px]">Edit</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative w-full">
        <Heading2 />
        <Button4 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[1.725px] relative w-full">
        <div className="flex flex-col font-['Liberation_Serif:Regular',sans-serif] justify-center leading-[22.75px] not-italic relative shrink-0 text-[#475569] text-[14px] w-full">
          <p className="mb-0">Specializing in Hass and Fuerte avocados, our farm</p>
          <p className="mb-0">utilizes AI-driven diagnostics to ensure the highest</p>
          <p className="mb-0">export quality. We maintain sustainable practices</p>
          <p className="mb-0">across 50 hectares of high-altitude volcanic soil. Our</p>
          <p className="mb-0">mission is to bridge the gap between organic farming</p>
          <p>and advanced technology.</p>
        </div>
      </div>
    </div>
  );
}

function Separator() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Separator">
      <div aria-hidden="true" className="absolute border-[rgba(17,212,17,0.05)] border-solid border-t inset-0 pointer-events-none" />
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[16px] relative shrink-0 w-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
        <g id="Container">
          <path d={svgPaths.p13e73800} fill="var(--fill-0, #11D411)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Serif:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[140.27px]">
        <p className="leading-[20px]">carlos.r@greenvalley.mx</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Container">
      <Container35 />
      <Container36 />
    </div>
  );
}

function Container38() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p143e1930} fill="var(--fill-0, #11D411)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Serif:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[102.41px]">
        <p className="leading-[20px]">+52 443 123 4567</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Container">
      <Container38 />
      <Container39 />
    </div>
  );
}

function Container41() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p237be000} fill="var(--fill-0, #11D411)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Link4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Liberation_Serif:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#11d411] text-[14px] w-[118.7px]">
        <p className="leading-[20px]">www.greenvalley.mx</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Container">
      <Container41 />
      <Link4 />
    </div>
  );
}

function Container33() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start pt-[1.1px] relative w-full">
        <Container34 />
        <Container37 />
        <Container40 />
      </div>
    </div>
  );
}

function Section() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Section">
      <div aria-hidden="true" className="absolute border border-[rgba(17,212,17,0.1)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[14.9px] items-start p-[25px] relative w-full">
        <Container31 />
        <Container32 />
        <Separator />
        <Container33 />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[18px] w-full">
          <p className="leading-[28px]">Location</p>
        </div>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="h-[30px] relative shrink-0 w-[24px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 30">
        <g id="Container">
          <path d={svgPaths.p2e497c80} fill="var(--fill-0, #EF4444)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Overlay1() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.1)] content-stretch flex inset-0 items-center justify-center" data-name="Overlay">
      <Container42 />
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#e2e8f0] h-[192px] relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[157.29%] left-0 max-w-none top-[-28.65%] w-full" src={imgBackground} />
        </div>
        <Overlay1 />
      </div>
    </div>
  );
}

function Section1() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Section">
      <div aria-hidden="true" className="absolute border border-[rgba(17,212,17,0.1)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[25px] relative w-full">
        <Heading3 />
        <Background />
      </div>
    </div>
  );
}

function LeftColumnBioInfo() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[352px]" data-name="Left Column: Bio & Info">
      <Section />
      <Section1 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 3">
      <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[20px] w-[216.67px]">
        <p className="leading-[28px]">AI-Verified Avocado Lots</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="relative shrink-0 size-[8.167px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.16667 8.16667">
        <g id="Container">
          <path d={svgPaths.p10ad69c0} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#11d411] content-stretch flex gap-[4px] items-center px-[16px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <Container44 />
      <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-center text-white w-[43.67px]">
        <p className="leading-[16px]">New Lot</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative w-full">
        <Heading4 />
        <Button5 />
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Heading 4">
      <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[16px] w-[122.52px]">
        <p className="leading-[24px]">Lot #AV-2023-104</p>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#d1fae5] relative rounded-[4px] self-stretch shrink-0" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-full items-center px-[8px] py-[2px] relative">
          <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#065f46] text-[12px] w-[50.52px]">
            <p className="leading-[16px]">Grade A+</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex h-[24px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Heading5 />
      <Background1 />
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Serif:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-full">
        <p className="leading-[20px]">Variety: Hass • Harvested: Oct 12, 2023</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="h-[11.667px] relative shrink-0 w-[9.333px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 11.6667">
        <g id="Container">
          <path d={svgPaths.pb10b170} fill="var(--fill-0, #11D411)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <Container51 />
      <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#11d411] text-[12px] w-[94.02px]">
        <p className="leading-[16px]">98% Health Index</p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="relative shrink-0 size-[11.667px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
        <g id="Container">
          <path d={svgPaths.p20f5ce00} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <Container53 />
      <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-[42.69px]">
        <p className="leading-[16px]">5,200 kg</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Container50 />
      <Container52 />
    </div>
  );
}

function Container46() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Container47 />
        <Container48 />
        <Container49 />
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="h-[15px] relative shrink-0 w-[22px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 15">
        <g id="Container">
          <path d={svgPaths.p3e801e80} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center mr-[-0.01px] p-[8px] relative shrink-0" data-name="Button">
      <Container55 />
    </div>
  );
}

function Container56() {
  return (
    <div className="h-[16px] relative shrink-0 w-[4px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 16">
        <g id="Container">
          <path d={svgPaths.p3caf0c80} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center mr-[-0.01px] p-[8px] relative shrink-0" data-name="Button">
      <Container56 />
    </div>
  );
}

function Container54() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center justify-end pr-[0.01px] relative">
        <Button6 />
        <Button7 />
      </div>
    </div>
  );
}

function LotCard() {
  return (
    <div className="h-[102px] relative rounded-[8px] shrink-0 w-full" data-name="Lot Card 1">
      <div aria-hidden="true" className="absolute border border-[rgba(17,212,17,0.05)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex gap-[16px] items-start p-[17px] relative size-full">
        <div className="aspect-[4/3] relative rounded-[8px] self-stretch shrink-0" data-name="Image">
          <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none rounded-[8px]">
            <img alt="" className="absolute h-[133.33%] left-0 max-w-none top-[-16.67%] w-full" src={imgImage} />
          </div>
        </div>
        <Container46 />
        <Container54 />
      </div>
    </div>
  );
}

function Heading6() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Heading 4">
      <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[16px] w-[122.52px]">
        <p className="leading-[24px]">Lot #AV-2023-098</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#dbeafe] relative rounded-[4px] self-stretch shrink-0" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-full items-center px-[8px] py-[2px] relative">
          <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#1e40af] text-[12px] w-[90.25px]">
            <p className="leading-[16px]">In Export Transit</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex h-[24px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Heading6 />
      <Background2 />
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Serif:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-full">
        <p className="leading-[20px]">Variety: Hass • Harvested: Sep 28, 2023</p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="h-[11.667px] relative shrink-0 w-[9.333px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 11.6667">
        <g id="Container">
          <path d={svgPaths.pb10b170} fill="var(--fill-0, #11D411)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container61() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <Container62 />
      <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#11d411] text-[12px] w-[94.02px]">
        <p className="leading-[16px]">95% Health Index</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="relative shrink-0 size-[11.667px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
        <g id="Container">
          <path d={svgPaths.p20f5ce00} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <Container64 />
      <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-[48.69px]">
        <p className="leading-[16px]">12,000 kg</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Container61 />
      <Container63 />
    </div>
  );
}

function Container57() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Container58 />
        <Container59 />
        <Container60 />
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="h-[15px] relative shrink-0 w-[22px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 15">
        <g id="Container">
          <path d={svgPaths.p3e801e80} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center mr-[-0.01px] p-[8px] relative shrink-0" data-name="Button">
      <Container66 />
    </div>
  );
}

function Container67() {
  return (
    <div className="h-[16px] relative shrink-0 w-[4px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 16">
        <g id="Container">
          <path d={svgPaths.p3caf0c80} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center mr-[-0.01px] p-[8px] relative shrink-0" data-name="Button">
      <Container67 />
    </div>
  );
}

function Container65() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center justify-end pr-[0.01px] relative">
        <Button8 />
        <Button9 />
      </div>
    </div>
  );
}

function LotCard1() {
  return (
    <div className="h-[102px] relative rounded-[8px] shrink-0 w-full" data-name="Lot Card 2">
      <div aria-hidden="true" className="absolute border border-[rgba(17,212,17,0.05)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex gap-[16px] items-start p-[17px] relative size-full">
        <div className="aspect-[4/3] relative rounded-[8px] self-stretch shrink-0" data-name="Image">
          <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none rounded-[8px]">
            <img alt="" className="absolute h-[133.33%] left-0 max-w-none top-[-16.67%] w-full" src={imgImage1} />
          </div>
        </div>
        <Container57 />
        <Container65 />
      </div>
    </div>
  );
}

function Heading7() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Heading 4">
      <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[16px] w-[122.52px]">
        <p className="leading-[24px]">Lot #AV-2023-085</p>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#fef3c7] relative rounded-[4px] self-stretch shrink-0" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-full items-center px-[8px] py-[2px] relative">
          <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#92400e] text-[12px] w-[70.31px]">
            <p className="leading-[16px]">Local Market</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex items-start justify-between relative size-full">
        <Heading7 />
        <Background3 />
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Serif:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-full">
        <p className="leading-[20px]">Variety: Fuerte • Harvested: Aug 15, 2023</p>
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="h-[11.667px] relative shrink-0 w-[9.333px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 11.6667">
        <g id="Container">
          <path d={svgPaths.pb10b170} fill="var(--fill-0, #11D411)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container72() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <Container73 />
      <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#11d411] text-[12px] w-[94.02px]">
        <p className="leading-[16px]">89% Health Index</p>
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="relative shrink-0 size-[11.667px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
        <g id="Container">
          <path d={svgPaths.p20f5ce00} fill="var(--fill-0, #64748B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container74() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <Container75 />
      <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-[42.69px]">
        <p className="leading-[16px]">3,500 kg</p>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Container72 />
      <Container74 />
    </div>
  );
}

function Container68() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Container69 />
        <Container70 />
        <Container71 />
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="h-[15px] relative shrink-0 w-[22px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 15">
        <g id="Container">
          <path d={svgPaths.p3e801e80} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center mr-[-0.01px] p-[8px] relative shrink-0" data-name="Button">
      <Container77 />
    </div>
  );
}

function Container78() {
  return (
    <div className="h-[16px] relative shrink-0 w-[4px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 16">
        <g id="Container">
          <path d={svgPaths.p3caf0c80} fill="var(--fill-0, #94A3B8)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button11() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center mr-[-0.01px] p-[8px] relative shrink-0" data-name="Button">
      <Container78 />
    </div>
  );
}

function Container76() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center justify-end pr-[0.01px] relative">
        <Button10 />
        <Button11 />
      </div>
    </div>
  );
}

function LotCard2() {
  return (
    <div className="h-[102px] relative rounded-[8px] shrink-0 w-full" data-name="Lot Card 3">
      <div aria-hidden="true" className="absolute border border-[rgba(17,212,17,0.05)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex gap-[16px] items-start p-[17px] relative size-full">
        <div className="aspect-[4/3] relative rounded-[8px] self-stretch shrink-0" data-name="Image">
          <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none rounded-[8px]">
            <img alt="" className="absolute h-[133.33%] left-0 max-w-none top-[-16.67%] w-full" src={imgImage2} />
          </div>
        </div>
        <Container68 />
        <Container76 />
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start relative w-full">
        <LotCard />
        <LotCard1 />
        <LotCard2 />
      </div>
    </div>
  );
}

function Container80() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Container">
          <path d={svgPaths.p1a406200} fill="var(--fill-0, #11D411)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button12() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Button">
      <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#11d411] text-[14px] text-center w-[106.03px]">
        <p className="leading-[20px]">View Full History</p>
      </div>
      <Container80 />
    </div>
  );
}

function Container79() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-center pt-[8px] relative w-full">
        <Button12 />
      </div>
    </div>
  );
}

function Section2() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Section">
      <div aria-hidden="true" className="absolute border border-[rgba(17,212,17,0.1)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[25px] relative w-full">
        <Container43 />
        <Container45 />
        <Container79 />
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p4c2b800} fill="var(--fill-0, #11D411)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Overlay2() {
  return (
    <div className="bg-[rgba(17,212,17,0.1)] relative rounded-[9999px] shrink-0 size-[48px]" data-name="Overlay">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Container81 />
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[16px] w-[87.16px]">
        <p className="leading-[24px]">Run AI Scan</p>
      </div>
    </div>
  );
}

function Container84() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Serif:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-[182.3px]">
        <p className="leading-[16px]">Upload new fruit samples for analysis</p>
      </div>
    </div>
  );
}

function Container82() {
  return (
    <div className="relative shrink-0 w-[182.3px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Container83 />
        <Container84 />
      </div>
    </div>
  );
}

function Button13() {
  return (
    <div className="content-stretch flex gap-[16px] items-center pl-[18px] pr-[95.7px] py-[18px] relative rounded-[12px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(17,212,17,0.2)] border-dashed inset-0 pointer-events-none rounded-[12px]" />
      <Overlay2 />
      <Container82 />
    </div>
  );
}

function Container85() {
  return (
    <div className="h-[22px] relative shrink-0 w-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 22">
        <g id="Container">
          <path d={svgPaths.p3b450d00} fill="var(--fill-0, #11D411)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Overlay3() {
  return (
    <div className="bg-[rgba(17,212,17,0.1)] relative rounded-[9999px] shrink-0 size-[48px]" data-name="Overlay">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Container85 />
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[16px] w-[83.27px]">
        <p className="leading-[24px]">List for Sale</p>
      </div>
    </div>
  );
}

function Container88() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Serif:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[12px] w-[187.27px]">
        <p className="leading-[16px]">Create a new listing in the marketplace</p>
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="relative shrink-0 w-[187.27px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Container87 />
        <Container88 />
      </div>
    </div>
  );
}

function Button14() {
  return (
    <div className="content-stretch flex gap-[16px] items-center pl-[18px] pr-[90.73px] py-[18px] relative rounded-[12px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(17,212,17,0.2)] border-dashed inset-0 pointer-events-none rounded-[12px]" />
      <Overlay3 />
      <Container86 />
    </div>
  );
}

function ManagementActions() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Management Actions">
      <Button13 />
      <Button14 />
    </div>
  );
}

function RightColumnVerificationHistory() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[736px]" data-name="Right Column: Verification History">
      <Section2 />
      <ManagementActions />
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex gap-[32px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <LeftColumnBioInfo />
      <RightColumnVerificationHistory />
    </div>
  );
}

function Main() {
  return (
    <div className="max-w-[1200px] relative shrink-0 w-full" data-name="Main">
      <div className="content-stretch flex flex-col gap-[32px] items-start max-w-[inherit] p-[40px] relative w-full">
        <ProfileHeaderSection />
        <StatsOverview />
        <Container30 />
      </div>
    </div>
  );
}

function MainMargin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Main:margin">
      <div className="content-stretch flex flex-col items-start px-[40px] relative w-full">
        <Main />
      </div>
    </div>
  );
}

function Container91() {
  return (
    <div className="h-[20px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
        <g id="Container">
          <path d={svgPaths.p2b677030} fill="var(--fill-0, #11D411)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container92() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#11d411] text-[16px] w-[179.88px]">
        <p className="leading-[24px]">AvoGuard AI Professional</p>
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container91 />
      <Container92 />
    </div>
  );
}

function Container93() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Serif:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[234.34px]">
        <p className="leading-[20px]">© 2024 AvoGuard AI. All rights reserved.</p>
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Liberation_Serif:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[14px] w-[82.05px]">
        <p className="leading-[20px]">Privacy Policy</p>
      </div>
    </div>
  );
}

function Link6() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Liberation_Serif:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[14px] w-[95.44px]">
        <p className="leading-[20px]">Terms of Service</p>
      </div>
    </div>
  );
}

function Link7() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Liberation_Serif:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[14px] w-[44.34px]">
        <p className="leading-[20px]">Support</p>
      </div>
    </div>
  );
}

function Container94() {
  return (
    <div className="content-stretch flex gap-[24px] h-[20px] items-start relative shrink-0" data-name="Container">
      <Link5 />
      <Link6 />
      <Link7 />
    </div>
  );
}

function Container89() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative w-full">
        <Container90 />
        <Container93 />
        <Container94 />
      </div>
    </div>
  );
}

function FooterFooter() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Footer Footer">
      <div aria-hidden="true" className="absolute border-[rgba(17,212,17,0.1)] border-solid border-t inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[32px] pt-[33px] px-[40px] relative w-full">
        <Container89 />
      </div>
    </div>
  );
}

function FooterFooterMargin() {
  return (
    <div className="content-stretch flex flex-col h-[113px] items-start justify-end min-h-[89px] pt-[24px] relative shrink-0 w-full" data-name="Footer Footer:margin">
      <FooterFooter />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start justify-between relative shrink-0 w-full" data-name="Container">
      <NavigationHeader />
      <MainMargin />
      <FooterFooterMargin />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center mb-[-0.5px] min-h-[1325px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container1 />
    </div>
  );
}

export default function FarmerProfileAndManagement() {
  return (
    <div className="bg-[#f6f8f6] content-stretch flex flex-col items-start pb-[0.5px] relative size-full" data-name="Farmer Profile and Management">
      <Container />
      <div className="h-[2.383px] mb-[-0.5px] relative shrink-0 w-[13.852px]" data-name="Icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.8516 2.38281">
          <path d={svgPaths.p6ff6080} fill="var(--fill-0, #0F172A)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}