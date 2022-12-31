import { Toast, Stack, Form } from 'react-bootstrap';
import { LayoutPage } from '../../common/layout'
import TreeView from '../../common/tree-view';
import { demoApp } from './demo-app';


export const TreeViewDemo = (props: any) => {
    const treeData = [
        {
            text: "Parent 1",
            children: [
                {
                    text: "Child 1",
                    children: [
                        {
                            text: "Grandchild with href",
                            href: "/"
                        },
                        {
                            text: "Grandchild 2"
                        }
                    ]
                },
                {
                    text: "Child 2"
                }
            ]
        },
        {
            text: "Parent 2"
        }
    ];
    const ui = () => {
        return (
            <LayoutPage microApp={demoApp} >
                <div className="demo-body">
                    <div className="demo-body-main">
                        <Toast className="demo-panel">
                            <Toast.Body>
                                <TreeView data={treeData}  options={{selectable:false, enableLinks:true}}/>
                            </Toast.Body>
                        </Toast>
                        <div className="demo-panel">
                            <Stack direction="horizontal" gap={3}>
                                <div >Select a Template (optional)</div>
                                <div className="ms-auto"></div>
                                <div className="ms-end">
                                    <Form.Select aria-label="Default select example">
                                        <option>Select a type</option>
                                        <option value="1">Transportation</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </div>
                                <div className="vr" />
                                <div className=" ms-end">
                                    <Form.Select aria-label="Default select example">
                                        <option>Select a source</option>
                                        <option value="1">Air flight</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select></div>
                                <div className="vr" />
                                <div >Preview template</div>
                            </Stack>
                        </div>
                    </div>
                </div>
            </LayoutPage >
        )
    }
    return ui();
}