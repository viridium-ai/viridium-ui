import { PureComponent } from "react";
import { Toast } from "react-bootstrap";
import { ImDownload, ImMagicWand } from "react-icons/im";
import { CodeViewer } from "../../components/v-code-view/code";
import { RouteItem } from "../../components/v-common/v-app";
import { EntityDetails, EntityList, FieldDef } from "../../components/v-entity/entity-form";
import { EntityManager } from "../../components/v-entity/entity-model";
import { LayoutBodyNav, LayoutPage, ViridiumOffcanvas } from "../../components/v-layout/v-layout";
import { StringUtils } from "../../components/v-utils/v-string-utils";
import { knowledgeApp } from "./knowledge-app";
import { modelClass, controllerClass, serviceClass } from "./v-code-generate";


enum DataType {
    decimal,
    integer,
    entityId,
    string,
    dateTime,
    reference
}
export const ENTITIES = [
    "AccommodationType",
    "BusinessTravel",
    "BusinessTravelType",
    "CapitalGood",
    "ContractualInstrumentType",
    "CountryRegionMapping",
    "Emission",
    "EmissionFactor",
    "EmissionsSource",
    "EstimationFactor",
    "Facility",
    "FacilityAnnualDetail",
    "FactorLibrary",
    "FactorMapping",
    "FuelType",
    "FugitiveEmission",
    "GreenhouseGas",
    "IndustrialProcess",
    "IndustrialProcessType",
    "Industry",
    "IndustryClassification",
    "MobileCombustion",
    "MonthlyRevenue",
    "OrganizationalHierarchy",
    "OrganizationalProfile",
    "OrganizationalUnit",
    "PurchasedEnergy",
    "PurchasedGoodAndService",
    "SpendType",
    "StationaryCombustion",
    "Subindustry",
    "Sustainability.manifest",
    "TransportMode",
    "TransportationAndDistribution",
    "Unit",
    "UnitGroup",
    "ValueChainPartner",
    "VehicleType",
    "Connector",
    "DataSource",
    "DataJob"
]
export class BaseSchemaObj {
    displayName: string = "";
    description: string = "";
    sourceName: string = "";
}

export class Attribute extends BaseSchemaObj {
    group: string = "";
    name: string = "";;
    sourceOrdering: number = -1;
    nullable: string = "true";
    purpose: string = "";
    dataType: string = "string"; //list of values
    maximumValue?: number;
    minimumValue?: number
    maximumLength?: number;
    static fieldDefs = () => {
        return [
            FieldDef.new("name"),
            FieldDef.new("dataType"),
            FieldDef.new("description"),
            FieldDef.new("nullable"),
            FieldDef.new("displayName"),
        ]
    }
}

export class Entity extends BaseSchemaObj {
    paths: Array<string> = [];
    entityName: string = "";
    attributes: Array<Attribute> = []

    static fieldDefs = () => {
        return [
            FieldDef.new("entityName"),
            FieldDef.new("description"),
            FieldDef.new("sourceName")
        ]
    }
}

class JsonEntity {
    definitions: Array<any> = [];
    imports: Array<any> = [];
    documentVersion: string = "";
    jsonSchemaSemanticVersion: string = ""
}

class Schema extends BaseSchemaObj {
    name: string = "GHG";
    entities: Array<Entity> = [];
    public getEntity(entityName: string): Promise<Entity> {
        let entity = this.entities.find((e) => e.entityName === entityName);
        if (entity === undefined) {
            return StringUtils.loadJson(`/resources/cdm-schema/${entityName}.cdm.json`).then((json: any) => {
                let newEntity = new Entity();
                newEntity.entityName = entityName;
                let jsonObject = new JsonEntity();
                Object.assign(jsonObject, json);
                newEntity.paths = jsonObject.imports.map((path) => path["corpusPath"]);
                let def = jsonObject.definitions[0] as any;
                newEntity.entityName = def["entityName"];
                newEntity.displayName = def["displayName"];
                newEntity.description = def["description"];
                newEntity.sourceName = def["sourceName"];
                let group = def["hasAttributes"][0]["attributeGroupReference"] as any;
                let jAttributes = group["members"] as any;
                newEntity.attributes = jAttributes.map((member: any) => {
                    let attribute = new Attribute();
                    Object.assign(attribute, member);
                    attribute.group = group["attributeGroupName"];
                    attribute.nullable = "" + member["isNullable"];
                    if (typeof member.dataType !== 'string' && !(member.dataType instanceof String)) {
                        attribute.dataType = "reference";
                    }
                    return attribute;
                });
                this.entities.push(newEntity);
                return newEntity;
            })
        } else {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(entity!);
                }, 30);
            })
        }
    }
}

export const GHGSchema = new Schema();

class SchemaManager extends EntityManager {

}

export const generateJavaCode = (entity: Entity) => {
    let code = [];

}

interface SchemaBrowserProps {
    entityName: string
}

interface SchemaBrowserState {
    entity?: Entity;
    code?: string,
    showCode: boolean
}

export class SchemaBrowser extends PureComponent<SchemaBrowserProps, SchemaBrowserState> {
    constructor(props: SchemaBrowserProps) {
        super(props);
        this.state = { entity: undefined, code: undefined, showCode: false }
    }

    public getNavItems = () => {
        return ENTITIES.map((entityName, idx: number) => {
            return {
                name: entityName,
                route: `/knowledge-app/schema/${entityName}`
            }
        });
    }

    public getNavItem = () => {
        return this.state.entity ? {
            name: this.state.entity.entityName,
            route: `/knowledge-app/schema/${this.state.entity.entityName}`
        } : undefined
    }

    componentDidUpdate(prevProps: Readonly<SchemaBrowserProps>, prevState: Readonly<SchemaBrowserState>, snapshot?: any): void {
        if (this.props.entityName !== prevProps.entityName) {
            //this.setState({ entity: undefined });
            GHGSchema.getEntity(this.props.entityName).then((entity: any) => {
                this.setState({ entity: entity });
            }).catch((error) => {
                console.log("Failed to get entity", error);
            });
        }
    }
    componentDidMount(): void {
        GHGSchema.getEntity(this.props.entityName).then((entity: any) => {
            this.setState({ entity: entity });
        }).catch((error) => {
            console.log("Failed to get entity", error);
        });
    }
    generateCode = () => {
        if (this.state.entity) {
            let contorllerCode = controllerClass(this.state.entity);
            let modelCode = modelClass(this.state.entity);
            let serviceCode = serviceClass(this.state.entity);
            this.setState({ code: contorllerCode + "\n\n" + modelCode + "\n\n" + serviceCode, showCode: true });
        }
    }
    hideCodeViewer = () => {
        this.setState({ showCode: false });
    }
    renderEntity = (entity: Entity) => {
        return (
            <div >
                <Toast.Header className="v-header" closeButton={false}>
                    <div className="me-auto">{entity.displayName}</div>
                    <span className="v-icon-button" onClick={this.download}><ImDownload /></span>
                    <span className="v-icon-button" onClick={this.generateCode}><ImMagicWand /></span>
                </Toast.Header>
                <div className="v-panel">
                    <EntityDetails title={""} entity={entity} fieldDefs={Entity.fieldDefs} />
                </div>
                <div className="v-panel">
                    <EntityList title="" entities={entity.attributes} fieldDefs={Attribute.fieldDefs} />
                </div>
            </div>
        )
    }
    download = (evt: any) => {
        if (this.state.entity) {
            let entity = this.state.entity;
            StringUtils.download(modelClass(this.state.entity), entity.entityName + ".java", "text/plain");
            StringUtils.download(serviceClass(this.state.entity), entity.entityName + "Repo.java", "text/plain");
            StringUtils.download(controllerClass(this.state.entity), entity.entityName + "Controller.java", "text/plain");
        }
    }
    sleep = (delay: number) => {
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay);
    }
    downloadAll = (evt: any) => {
        ENTITIES.forEach((entityName) => {
            GHGSchema.getEntity(entityName).then((entity: any) => {
                this.sleep(500);
                try {
                    StringUtils.download(modelClass(entity), entity.entityName + ".java", "text/plain");
                    StringUtils.download(serviceClass(entity), entity.entityName + "Repo.java", "text/plain");
                    StringUtils.download(controllerClass(entity), entity.entityName + "Controller.java", "text/plain");
                } catch {
                    console.log("Failed to proces " + entityName);
                }

            }).catch((error) => {
                console.log("Failed to get entity", error);
            });
        })

    }
    //UI 
    render = () => {
        let entity = this.state.entity;
        return (
            <LayoutPage microApp={knowledgeApp}>
                <div className="v-body-nav">
                    <Toast.Header className="v-header" closeButton={false}>
                        <div className="me-auto">Entities</div>
                        <span className="v-icon-button" onClick={this.downloadAll}><ImDownload /></span>
                    </Toast.Header>
                    <LayoutBodyNav selected={this.getNavItem()} routeItems={this.getNavItems()} />
                </div>
                <div className="v-body-main">
                    {entity ? this.renderEntity(entity) : `Loading...`}
                </div>
                <ViridiumOffcanvas showTitle={false} onHide={this.hideCodeViewer} showForm={this.state.showCode} title={"Generated code"} >
                    <CodeViewer text={this.state.code} />
                </ViridiumOffcanvas>
            </LayoutPage>
        )
    }
}
