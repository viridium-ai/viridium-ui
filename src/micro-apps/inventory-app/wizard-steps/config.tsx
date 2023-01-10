import { useState } from "react";

import { Toast } from "react-bootstrap";
import { LayoutPage } from "../../../components/layout";
import { DimensionView } from "../../../components/table";
import { Question, Action } from "../../../components/wizard";
import { getConfigs } from "../../../config/viridium-config";
import { inventoryConfigApp } from "../inventory-app";
import { Questionnaire, getQuestionnaire, updateQuestionnaire } from "../inventory-common";

export const InventoryConfig = (props: any) => {
    const configs = getConfigs();
    const [questionnaire, setQuestionnaire] = useState<Questionnaire>(getQuestionnaire());
    const onSetCategory = (evt: any) => {
        let clone = { ...questionnaire };
        clone.context = evt.id;
        setQuestionnaire(clone);
        updateQuestionnaire(clone);
    }
    const onSelectCoverage = (evt: any) => {
        let clone = { ...questionnaire };
        clone.type = evt.id;
        setQuestionnaire(clone);
        updateQuestionnaire(clone);
    }

    const onSelectStandard = (evt: any) => {
        let clone = { ...questionnaire };
        clone.standard = evt.id;
        setQuestionnaire(clone);
        updateQuestionnaire(clone);
    }
    
    const onSelectRegulation = (evt: any) => {
        let clone = { ...questionnaire };
        clone.regulation = evt.id;
        setQuestionnaire(clone);
        updateQuestionnaire(clone);
    }

    const ui = () => {
        console.log(questionnaire);
        return (
            <LayoutPage microApp={inventoryConfigApp} withAppHeader={true} >
                <div className="wizard-body">
                    <div className="wizard-body-main">
                        <Toast >
                            <Toast.Header closeButton={false}>
                                <strong className="me-auto">
                                    {questionnaire.companyName}
                                </strong>
                                Viridium Industry: {questionnaire.category}
                            </Toast.Header>
                            <Toast.Body>
                                <Question label="Sustainability Category">
                                    <DimensionView data={configs.environmentalCategories} value={questionnaire.context} placeHolder={"Select a category"} onSelectValue={onSetCategory} />
                                </Question>

                                <Question label="Scope of Data Coverage">
                                    <DimensionView data={configs.dataCoverageScopes} value={questionnaire.type} placeHolder={"Select a coverage"} onSelectValue={onSelectCoverage} />
                                </Question>

                                <Question label="Standards">
                                    <DimensionView data={configs.standards} value={questionnaire.standard} placeHolder={"Select a standard"} onSelectValue={onSelectStandard} />

                                </Question>
                                <Question label="Regulations">
                                    <DimensionView data={configs.regulations} value={questionnaire.regulation} placeHolder={"Select a regulation"} onSelectValue={onSelectRegulation} />
                                </Question>
                                <Action report={questionnaire}
                                    next={{ label: "Next", path: props.next }}
                                    prev={{ label: "Back", path: props.prev }} />
                            </Toast.Body>
                        </Toast>
                    </div>
                </div>
            </LayoutPage >
        )
    }

    return ui();
}