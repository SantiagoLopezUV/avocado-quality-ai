import svgPaths from "./svg-kk3he5a66y";
import imgSunDrenchedAvocadoOrchardWithHealthyTrees from "figma:asset/22e06e7dc651db027b4cac02facfb4782d31d48f.png";
import imgFarmerAvatar from "figma:asset/02acc922e40cffe6049d3a48a44840c2d57e2383.png";
import imgFarmerAvatar1 from "figma:asset/0e71a3c369ac48d1bfff03ed44b87bcbd8bf1375.png";
import imgFarmerAvatar2 from "figma:asset/df43639d390c303df126e797d8feb08d6c09bfdc.png";
import imgGoogleIcon from "figma:asset/8606525667a673f59e849f87847863c78e03a65f.png";
import imgLinkedInIcon from "figma:asset/d7051963e54041e28e39c87a44750ea6af4cd930.png";

function SunDrenchedAvocadoOrchardWithHealthyTrees() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Sun-drenched avocado orchard with healthy trees">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-19.84%] max-w-none top-0 w-[139.69%]" src={imgSunDrenchedAvocadoOrchardWithHealthyTrees} />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-start justify-center opacity-20" data-name="Container">
      <SunDrenchedAvocadoOrchardWithHealthyTrees />
      <div className="absolute inset-0" data-name="Gradient" style={{ backgroundImage: "linear-gradient(129.262deg, rgba(17, 212, 17, 0.4) 0%, rgba(17, 212, 17, 0) 100%)" }} />
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[12.25px] relative shrink-0 w-[12.833px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.8333 12.25">
        <g id="Container">
          <path d={svgPaths.p26f9d500} fill="var(--fill-0, #11D411)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(17,212,17,0.1)] content-stretch flex gap-[8px] items-center px-[12px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Overlay">
      <Container4 />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#11d411] text-[12px] tracking-[0.6px] uppercase w-[194.91px]">
        <p className="leading-[16px]">Agriculture AI Excellence</p>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black justify-center leading-[0] not-italic relative shrink-0 text-[#0d1b0d] text-[60px] tracking-[-1.5px] w-full">
        <p className="leading-[60px] mb-0">Empowering</p>
        <p className="leading-[60px] mb-0 text-[#11d411]">Avocado</p>
        <p className="mb-0">
          <span className="font-['Inter:Black',sans-serif] font-black leading-[60px] not-italic text-[#11d411]">Farmers</span>
          <span className="leading-[60px]">{` with`}</span>
        </p>
        <p className="leading-[60px]">AI</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[29.25px] not-italic relative shrink-0 text-[18px] text-[rgba(13,27,13,0.7)] w-full">
        <p className="mb-0">Diagnose crop health instantly and showcase your</p>
        <p className="mb-0">premium lots to global buyers. Join our sustainable</p>
        <p className="mb-0">{`agricultural community and scale your orchard's`}</p>
        <p>potential.</p>
      </div>
    </div>
  );
}

function FarmerAvatar() {
  return (
    <div className="mr-[-8px] pointer-events-none relative rounded-[9999px] shrink-0 size-[40px]" data-name="Farmer avatar">
      <div className="absolute inset-0 overflow-hidden rounded-[9999px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgFarmerAvatar} />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 rounded-[9999px]" />
    </div>
  );
}

function FarmerAvatar1() {
  return (
    <div className="pointer-events-none relative rounded-[9999px] shrink-0 size-[40px]" data-name="Farmer avatar">
      <div className="absolute inset-0 overflow-hidden rounded-[9999px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgFarmerAvatar1} />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 rounded-[9999px]" />
    </div>
  );
}

function ImgFarmerAvatarMargin() {
  return (
    <div className="content-stretch flex flex-col items-start mr-[-8px] relative shrink-0 size-[40px]" data-name="Img - Farmer avatar:margin">
      <FarmerAvatar1 />
    </div>
  );
}

function FarmerAvatar2() {
  return (
    <div className="pointer-events-none relative rounded-[9999px] shrink-0 size-[40px]" data-name="Farmer avatar">
      <div className="absolute inset-0 overflow-hidden rounded-[9999px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgFarmerAvatar2} />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 rounded-[9999px]" />
    </div>
  );
}

function ImgFarmerAvatarMargin1() {
  return (
    <div className="content-stretch flex flex-col items-start mr-[-8px] relative shrink-0 size-[40px]" data-name="Img - Farmer avatar:margin">
      <FarmerAvatar2 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex items-start pr-[8px] relative shrink-0" data-name="Container">
      <FarmerAvatar />
      <ImgFarmerAvatarMargin />
      <ImgFarmerAvatarMargin1 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e1a] text-[14px] w-[209.58px]">
        <p className="leading-[20px]">Joined by 2,000+ local farmers</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex gap-[16px] items-center pt-[8px] relative shrink-0 w-full" data-name="Container">
      <Container7 />
      <Container8 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start max-w-[512px] relative shrink-0 w-full" data-name="Container">
      <Overlay />
      <Heading />
      <Container5 />
      <Container6 />
    </div>
  );
}

function LeftSideHeroImageAndContent() {
  return (
    <div className="bg-[#f3f7f3] flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Left Side: Hero Image and Content">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[96px] relative size-full">
          <Container2 />
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#0d1b0d] text-[30px] tracking-[-0.75px] w-full">
        <p className="leading-[36px]">Welcome to AvoHealth</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(26,46,26,0.6)] w-full">
        <p className="leading-[24px]">Join the future of precision avocado farming.</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Container11 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px py-[8px] relative rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" data-name="Button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0d1b0d] text-[14px] text-center w-[37.44px]">
        <p className="leading-[20px]">Login</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px py-[8px] relative rounded-[8px]" data-name="Button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e1a] text-[14px] text-center w-[52.67px]">
        <p className="leading-[20px]">Sign Up</p>
      </div>
    </div>
  );
}

function FormToggle() {
  return (
    <div className="bg-[#f3f7f3] relative rounded-[12px] shrink-0 w-full" data-name="Form Toggle">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center p-[6px] relative w-full">
          <Button />
          <Button1 />
        </div>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[16px] w-full">
          <p className="leading-[normal]">farmer@orchard.com</p>
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[rgba(243,247,243,0.5)] relative rounded-[12px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pl-[41px] pr-[17px] py-[17px] relative w-full">
          <Container14 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e4ede4] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute bottom-[24.07%] content-stretch flex flex-col items-start left-[12px] top-[24.07%]" data-name="Container">
      <div className="h-[13.333px] relative shrink-0 w-[16.667px]" data-name="Icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 13.3333">
          <path d={svgPaths.p68cd680} fill="var(--fill-0, #C8DBC8)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Input />
      <Container15 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col gap-[8.5px] items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0d1b0d] text-[14px] w-[95.2px]">
        <p className="leading-[20px]">Email Address</p>
      </div>
      <Container13 />
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Label">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0d1b0d] text-[14px] w-[65.59px]">
        <p className="leading-[20px]">Password</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#11d411] text-[12px] w-[44.05px]">
        <p className="leading-[16px]">Forgot?</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Label />
      <Link />
    </div>
  );
}

function Container19() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[16px] w-full">
          <p className="leading-[normal]">••••••••</p>
        </div>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-[rgba(243,247,243,0.5)] relative rounded-[12px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pl-[41px] pr-[17px] py-[17px] relative w-full">
          <Container19 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e4ede4] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute bottom-[24.07%] content-stretch flex flex-col items-start left-[12px] top-[24.07%]" data-name="Container">
      <div className="h-[17.5px] relative shrink-0 w-[13.333px]" data-name="Icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 17.5">
          <path d={svgPaths.p2eed4060} fill="var(--fill-0, #C8DBC8)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Input1 />
      <Container20 />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <Container18 />
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <path d={svgPaths.pc296280} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ImageFill() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="image fill">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <Svg />
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-[#11d411] relative rounded-[4px] shrink-0 size-[22px]" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-px relative size-full">
        <ImageFill />
      </div>
    </div>
  );
}

function Label1() {
  return (
    <div className="relative shrink-0" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[0.5px] items-start leading-[0] not-italic relative text-[#0d1b0d]">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center relative shrink-0 text-[14px] w-[187.56px]">
          <p className="leading-[20px]">Register as Certified Farmer</p>
        </div>
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center opacity-70 relative shrink-0 text-[12px] w-[297.77px]">
          <p className="leading-[16px]">{`Enables lot marketplace access & AI diagnostic tools`}</p>
        </div>
      </div>
    </div>
  );
}

function OverlayBorder() {
  return (
    <div className="bg-[rgba(243,247,243,0.3)] relative rounded-[12px] shrink-0 w-full" data-name="Overlay+Border">
      <div aria-hidden="true" className="absolute border border-[#e4ede4] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[11px] items-center pl-[16px] pr-[93.23px] py-[17px] relative w-full">
          <Input2 />
          <Label1 />
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#11d411] content-stretch flex items-center justify-center py-[16px] relative rounded-[12px] shrink-0 w-full" data-name="Button">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[12px] shadow-[0px_10px_15px_-3px_rgba(17,212,17,0.2),0px_4px_6px_-4px_rgba(17,212,17,0.2)]" data-name="Button:shadow" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#0d1b0d] text-[16px] text-center w-[146.97px]">
        <p className="leading-[24px]">Access Dashboard</p>
      </div>
    </div>
  );
}

function LoginForm() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full" data-name="Login Form">
      <Container12 />
      <Container16 />
      <OverlayBorder />
      <Button2 />
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex inset-0 items-center justify-center" data-name="Container">
      <div className="flex-[1_0_0] h-px min-h-px min-w-px relative" data-name="Horizontal Divider">
        <div aria-hidden="true" className="absolute border-[#e4ede4] border-solid border-t inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[8px] relative self-stretch shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[12px] uppercase w-[118.5px]">
        <p className="leading-[16px]">Or continue with</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex h-[16px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Background />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start py-[16px] relative shrink-0 w-full" data-name="Container">
      <Container22 />
      <Container23 />
    </div>
  );
}

function GoogleIcon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Google icon">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgGoogleIcon} />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0d1b0d] text-[14px] text-center w-[48.23px]">
          <p className="leading-[20px]">Google</p>
        </div>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center pl-[67.88px] pr-[67.89px] py-[13px] relative rounded-[12px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e4ede4] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <GoogleIcon />
      <Container25 />
    </div>
  );
}

function LinkedInIcon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="LinkedIn icon">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgLinkedInIcon} />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0d1b0d] text-[14px] text-center w-[57.27px]">
          <p className="leading-[20px]">LinkedIn</p>
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center pl-[63.36px] pr-[63.37px] py-[13px] relative rounded-[12px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e4ede4] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <LinkedInIcon />
      <Container26 />
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Button3 />
      <Button4 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start max-w-[440px] relative shrink-0 w-[440px]" data-name="Container">
      <Container10 />
      <FormToggle />
      <LoginForm />
      <Container21 />
      <Container24 />
    </div>
  );
}

function RightSideAuthForms() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Right Side: Auth Forms">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[64px] py-[48px] relative size-full">
          <Container9 />
        </div>
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="absolute content-stretch flex h-[783px] items-start left-0 right-0 top-[65px]" data-name="Main">
      <LeftSideHeroImageAndContent />
      <RightSideAuthForms />
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[12px] w-[496.91px]">
        <p className="leading-[16px]">© 2024 AvoHealth AI. All rights reserved. Precision Agriculture for a Sustainable Future.</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[12px] w-[79.34px]">
        <p className="leading-[16px]">Privacy Policy</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[12px] w-[96.66px]">
        <p className="leading-[16px]">Terms of Service</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[12px] w-[67.72px]">
        <p className="leading-[16px]">Help Center</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex gap-[24px] h-[16px] items-start relative shrink-0" data-name="Container">
      <Link1 />
      <Link2 />
      <Link3 />
    </div>
  );
}

function Container27() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative w-full">
        <Container28 />
        <Container29 />
      </div>
    </div>
  );
}

function FooterSmall() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-0 pb-[24px] pt-[25px] px-[40px] right-0 top-[959px]" data-name="Footer Small">
      <div aria-hidden="true" className="absolute border-[#e4ede4] border-solid border-t inset-0 pointer-events-none" />
      <Container27 />
    </div>
  );
}

function Container31() {
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

function Overlay1() {
  return (
    <div className="bg-[rgba(17,212,17,0.1)] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[32px]" data-name="Overlay">
      <Container31 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[25px] justify-center leading-[0] not-italic relative shrink-0 text-[#0d1b0d] text-[20px] tracking-[-0.5px] w-[120.97px]">
        <p className="leading-[25px]">AvoHealth AI</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative">
        <Overlay1 />
        <Heading2 />
      </div>
    </div>
  );
}

function Link4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0d1b0d] text-[14px] w-[103.27px]">
        <p className="leading-[20px]">Diagnostic Tool</p>
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0d1b0d] text-[14px] w-[83.3px]">
        <p className="leading-[20px]">Marketplace</p>
      </div>
    </div>
  );
}

function Link6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0d1b0d] text-[14px] w-[61.86px]">
        <p className="leading-[20px]">About Us</p>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative self-stretch shrink-0" data-name="Nav">
      <Link4 />
      <Link5 />
      <Link6 />
    </div>
  );
}

function Container32() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-end relative size-full">
        <Nav />
      </div>
    </div>
  );
}

function HeaderNavigation() {
  return (
    <div className="absolute backdrop-blur-[6px] bg-[rgba(246,248,246,0.8)] content-stretch flex items-center justify-between left-0 pb-[17px] pt-[16px] px-[40px] right-0 top-0" data-name="Header - Navigation">
      <div aria-hidden="true" className="absolute border-[#e4ede4] border-b border-solid inset-0 pointer-events-none" />
      <Container30 />
      <Container32 />
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[1024px] relative shrink-0 w-full" data-name="Container">
      <Main />
      <FooterSmall />
      <HeaderNavigation />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center min-h-[1024px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container1 />
    </div>
  );
}

export default function LoginAndRegistrationPage() {
  return (
    <div className="bg-[#f6f8f6] content-stretch flex flex-col items-start relative size-full" data-name="Login and Registration Page">
      <Container />
    </div>
  );
}