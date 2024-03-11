
interface ImagePanelProps {
  sources: string[];
  classes?: string;
  caption: string;
}

const ImagePanel = (props: ImagePanelProps) => {
  return (
    <div className="w-full">
      <div className="w-full flex flex-row justify-around">
        {props.sources.map((source, i) => (
          <div key={i} className={props.classes ? props.classes : ''}>
            <img key={i} src={source} className="h-full object-contain" />
          </div>
        ))}
      </div>
      <p className="text-center mt-2">{props.caption}</p>
    </div>
  );
}

export default ImagePanel;
