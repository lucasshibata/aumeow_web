import TitleBusiness from './TitleBusiness';
import RenderLogo from './RenderLogo';

export default function TitleLogo(){
    return(
        <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems:"Center"}}>
            <RenderLogo />
            <TitleBusiness />
        </div>
    );
};


