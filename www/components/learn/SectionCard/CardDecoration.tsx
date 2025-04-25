export function CardDecoration({ isReview }: { isReview: boolean }) {
  if (isReview) {
    return (
      <>
        <div className="absolute right-0 top-0 h-32 w-32 bg-[#DAA520]/10 rounded-bl-[120px] transform translate-x-10 -translate-y-10 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform duration-300" />
        <div className="absolute left-0 bottom-0 h-24 w-24 bg-[#DAA520]/10 rounded-tr-[100px] transform -translate-x-6 translate-y-6 group-hover:-translate-x-3 group-hover:translate-y-3 transition-transform duration-300" />
      </>
    );
  }

  return (
    <>
      <div className="absolute right-0 top-0 h-24 w-24 bg-[#DAA520]/5 rounded-bl-[100px] transform translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-300" />
      <div className="absolute right-0 bottom-0 h-16 w-16 bg-[#DAA520]/5 rounded-tl-[100px] transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300" />
      <div className="absolute left-0 top-0 h-16 w-16 bg-[#DAA520]/5 rounded-br-[100px] transform -translate-x-4 -translate-y-4 group-hover:-translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
    </>
  );
}
