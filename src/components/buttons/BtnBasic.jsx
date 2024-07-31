import '../../styles/btnHover.css';

export default function BtnBasic({
  BtnBasicText,
  additionalClasses = '',
  BtnBasicIcon,
}) {
  return (
    <button
      type="submit"
      className={`text-white BtnBasic_hoverBg rounded-lg z-10 font-black flex items-center justify-center p-2 my-4 text-lg ${additionalClasses}`}
    >
      {BtnBasicIcon}
      {BtnBasicText}
    </button>
  );
}
