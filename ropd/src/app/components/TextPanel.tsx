
interface TextPanelProps {
  heading: string;
  text: string[];
  border: string;
}

const TextPanel = (props: TextPanelProps) => {
  return (
    <div className={"h-full flex items-center p-5 " + props.border}>
      <div className='pt-10 pb-10 flex flex-col items-center'>
        <p className='w-full text-2xl text-left mb-2'>{props.heading}</p>
        {props.text.map((paragraph, i) => <p key={i} className='w-full text-left mb-2'>{paragraph}</p>)}
      </div>
    </div>
  );
}

export default TextPanel;
