import InterviewId from "../_components/Interview";


export default async function Interview({params}) {
  const { id } = await params
  return (
    <div className="my-10 flex justify-center flex-col items-center">
      <h2 className="font-bold text-2xl">Lest's Get Started</h2>
      <InterviewId id={id} />
    </div>
  );
}
