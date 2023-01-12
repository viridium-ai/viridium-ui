import { Toast } from 'react-bootstrap';
import { LayoutPage } from '../../components/layout'
import TreeView from '../../components/tree-view';
import { demoApp } from './demo-app';


export const TreeViewDemo = (props: any) => {
    const treeData = {
        id: "demo-root", 
        children: [
            {
                id: "p-1",
                text: "Parent 1",
                state: {
                    selected: false,
                    expanded: false
                },
                children: [
                    {
                        id: "demo-1",
                        text: "Child 1",
                        state: {
                            selected: false,
                            expanded: false
                        },
                        children: [
                            {
                                id: "demo-1.1",
                                text: "Grandchild with href",
                                href: "/", state: {
                                    selected: false,
                                    expanded: false
                                },
                            },
                            {
                                id: "demo1.2",
                                text: "Grandchild 2",
                                state: {
                                    selected: false,
                                    expanded: false
                                },
                            }
                        ]
                    },
                    {
                        id : "test",
                        text: "Child 2"
                    }
                ]
            },
            {
                id: "p-2",
                text: "Parent 2",
                state: {
                    selected: false,
                    expanded: false
                },
                children: [
                    {
                        id: "demo-2.1",
                        text: "Grandchild with href",
                        href: "/", state: {
                            selected: false,
                            expanded: false
                        },
                    },
                    {
                        id: "demo2.2",
                        text: "Grandchild 2",
                        state: {
                            selected: false,
                            expanded: false
                        },
                    }
                ]
            }
        ]
    };
    const ui = () => {
        return (
            <LayoutPage microApp={demoApp} >
                <div className="demo-body">
                    <div className="demo-body-main">
                        <Toast className="demo-panel">
                            <Toast.Body>
                                <TreeView data={treeData} options={{ selectable: false, enableLinks: true }} />
                            </Toast.Body>
                        </Toast>
                    </div>
                </div>
            </LayoutPage >
        )
    }
    return ui();
}