import * as  React from "react";

interface Logo  {
    url: string,
    width: string,
    alt: string
}
const Logo: React.FC<Logo> = ({url, width, alt}) => <img src={url} width={width} alt={alt}/>

export default Logo;
