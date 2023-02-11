import { useState } from "react";

import { Toast } from "react-bootstrap";
import { Question, Action } from "../../../components/v-flow/wizard";
import { LayoutPage } from "../../../components/v-layout/v-layout";
import { DimensionView } from "../../../components/v-table/v-table";
import { getConfigs } from "../../../config/v-config";
import { inventoryConfigApp } from "../inventory-app";
import { Questionnaire, getQuestionnaire, updateQuestionnaire } from "../inventory-questionaire";

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
        return (
            <LayoutPage microApp={inventoryConfigApp}  >
                <Toast >
                    <Toast.Header closeButton={false}>
                        <strong className="me-auto">
                            {questionnaire.companyName}
                        </strong>
                        Viridium Industry: {questionnaire.category}
                    </Toast.Header>
                    <Toast.Body>
                        <Question label="Sustainability Category">
                            <DimensionView data={configs.environmentalCategories} options={{ value: questionnaire.context, placeHolder: "Select a category", onSelectValue: onSetCategory }} />
                        </Question>

                        <Question label="Scope of Data Coverage">
                            <DimensionView data={configs.dataCoverageScopes} options={{ value: questionnaire.type, placeHolder: "Select a coverage", onSelectValue: onSelectCoverage }} />
                        </Question>

                        <Question label="Standards">
                            <DimensionView data={configs.standards} options={{ value: questionnaire.standard, placeHolder: "Select a standard", onSelectValue: onSelectStandard }} />

                        </Question>
                        <Question label="Regulations">
                            <DimensionView data={configs.regulations} options={{ value: questionnaire.regulation, placeHolder: "Select a regulation", onSelectValue: onSelectRegulation }} />
                        </Question>
                        <Action report={questionnaire}
                            next={{ label: "Next", path: props.next }}
                            prev={{ label: "Back", path: props.prev }} />
                    </Toast.Body>
                </Toast>
            </LayoutPage >
        )
    }

    return ui();
}