import { Toast } from 'react-bootstrap';
import { LayoutPage } from '../../components/v-layout/v-layout'
import TreeView from '../../components/v-tree-view/v-tree-view';
import { demoApp } from './demo-app';
export const TreeViewDemo = (props: any) => {
    const treeData = {
        id: "demo-root",
        text: "treeData 123",
        options: {
            selectable: true
        },
        children: [
            {
                id: "p-1",
                text: "Parent 1",
                state: {
                    selected: true,
                    expanded: true
                },
                children: [
                    {
                        id: "demo-1",
                        text: "Child 1",
                        state: {
                            selected: false,
                            expanded: true
                        },
                        children: [
                            {
                                id: "demo-1.1",
                                text: "demo-1.1",
                                href: "/",
                                state: {
                                    selected: false,
                                    expanded: false
                                },
                            },
                            {
                                id: "demo1.2",
                                text: "demo1.2",
                                state: {
                                    selected: false,
                                    expanded: false
                                },
                            }
                        ]
                    },
                    {
                        id: "Child 2",
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
                        text: "demo-2.1",
                        href: "/", state: {
                            selected: false,
                            expanded: false
                        },
                    },
                    {
                        id: "demo2.2",
                        text: "demo2.2",
                        state: {
                            selected: false,
                            expanded: false
                        },
                    },
                    {
                        id: "demo2.3",
                        text: "demo2.3",
                        state: {
                            selected: false,
                            expanded: false
                        },
                    },
                    {
                        id: "demo2.4",
                        text: "demo2.4",
                        state: {
                            
                            selected: false,
                            expanded: false
                        },
                    },
                    {
                        id: "demo2.5",
                        text: "demo 2.5",
                        state: {
                            selected: false,
                            expanded: true
                        },
                        children: [
                            {
                                id: "demo-3.1",
                                text: "demo-3.1",
                                href: "/", state: {
                                    selected: false,
                                    expanded: false
                                },
                            },
                            {
                                id: "demo3.2",
                                text: "demo3.2",
                                state: {
                                    selected: false,
                                    expanded: false
                                },
                            },
                            {
                                id: "demo3.3",
                                text: "demo3.3",
                                state: {
                                    selected: false,
                                    expanded: false
                                },
                            },
                            {
                                id: "demo3.4",
                                text: "demo3.4",
                                state: {
                                    selected: false,
                                    expanded: false
                                },
                            },
                            {
                                id: "demo3.5",
                                text: "demo3.5",
                                state: {
                                    selected: false,
                                    expanded: false
                                },
                            }
                        ]
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
                                <TreeView data={treeData} options={{ selectable: true, enableLinks: true, selectChildren: false }} />
                            </Toast.Body>
                        </Toast>
                    </div>
                </div>
            </LayoutPage >
        )
    }
    return ui();
}