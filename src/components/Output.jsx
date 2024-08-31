import Element from "./Element"
import { Handle, Position } from "reactflow";

export default function Output(){
    const format = [
        { id: "email_output", title: "email", type: "target" },
        { id: "password_output", title: "password", type: "target" },
    ]
    return(
        <Element format={format} position={Position.Left} title="Output" />
    )
}