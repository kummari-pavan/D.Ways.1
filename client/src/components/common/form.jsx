const { Input } = require("postcss");
const { Form } = require("react-router-dom");


function CommonForm(formControls){
    function renderInputsByComponentType(getControlItem){
        let element=null;
        switch(getControlItem.componentType){
            case 'input':
                element=(
                    <Input
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        type={getControlItem.type}
                    />
                );
                break;
            case 'select':
                element=(
                    <Input
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        type={getControlItem.type}
                    />
                );
                break;
            case 'textarea':
                element=(
                    <Input
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        type={getControlItem.type}
                    />
                );
                break;
            default:
                element=(
                    <Input
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        type={getControlItem.type}
                    />
                );
                break
        }
    }
    return (
        <form>
            <div className="flex flex-col gap-3">
                {
                    formControls.map(controlItem=>  <div className="grid w-full gap-1.5" key={controlItem.name}>
                        <Label className="mb-1">{controlItem.label}</Label>
                        {renderInputsByComponentType(controlItem)}
                      </div>)
                }

            </div>
        </form>
    )
}