import { PureComponent } from "react";
import { Route } from "react-router-dom";
import { MicroApp, RouteItem } from "../../components/v-common/v-app";
import { EntityManager } from "../../components/v-entity/entity-model";
import { LayoutBodyNav, LayoutPage } from "../../components/v-layout/v-layout";
import { StringUtils } from "../../components/v-utils/v-string-utils";

enum DataType {
    decimal,
    integer,
    entityId,
    string,
    dateTime,
    reference
}
const ENTITIES = [
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
    "GlobalOptionsets",
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
    "VehicleType"
]
class BaseSchemaObj {
    displayName: string = "";
    description: string = "";
    sourceName: string = "";
}

class Attribute extends BaseSchemaObj {
    group: string = "";
    name: string = "";;
    sourceOrdering: number = -1;
    isNullable: boolean = true;
    purpose: string = "";
    dataType: DataType = DataType.string; //list of values
    maximumValue?: number;
    minimumValue?: number
    maximumLength?: number;
}

class Entity extends BaseSchemaObj {
    paths: Array<string> = [];
    entityName: string = "";
    attributes: Array<Attribute> = []
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
                    return attribute;
                });
                this.entities.push(newEntity);
                console.log(newEntity);
                return newEntity;
            })
        }
        else {
            return new Promise(() => {
                return entity;
            })
        }
    }
}

export const GHGSchema = new Schema();

class SchemaManager extends EntityManager {

}

class SchemaApp extends MicroApp {
    public getName = () => {
        return "schema-app";
    }
    public getTitle = (): string => {
        return "Schema Entity Browser";
    }

    public isSecure = () => false;
    public getRouteItems = () => {
        return [];
    }

    public getNavItems = () => {
        return ENTITIES.map((entityName, idx: number) => {
            return new RouteItem().init(entityName, entityName, "1", `/schema-app/${entityName}`)
        });
    }

    public getRoutes = () => {
        return (
            <>
                <Route key={`schema_route_default`} path={`/schema-app`} element={<SchemaBrowser entityName="Unit" />} />
                {ENTITIES.map((entityName, idx: number) => {
                    return <Route key={`schema_route_${entityName}`} path={`/schema-app/${entityName}`} element={<SchemaBrowser entityName={entityName} />} />
                }
                )}
            </>
        )
    }
}

export const schemaApp = new SchemaApp();

interface SchemaBrowserProps {
    entityName: string
}

interface SchemaBrowserState {
    entity?: Entity
}

export class SchemaBrowser extends PureComponent<SchemaBrowserProps, SchemaBrowserState> {
    constructor(props: SchemaBrowserProps) {
        super(props);
        this.state = { entity: undefined }
    }

    componentDidMount(): void {
        console.log("Load entity")
        GHGSchema.getEntity(this.props.entityName).then((entity: any) => {
            this.setState({ entity: entity });
        }).catch((error) => {
            console.log("Failed to get entity", error);
        });
    }

    //UI 
    render = () => {
        let entity = this.state.entity;
        return (
            <div className='schema-app'>
                <LayoutPage microApp={schemaApp}>
                    <LayoutBodyNav routeItems={schemaApp.getNavItems()} />
                    <div className="v-body-main">
                        {entity ? entity.entityName : `Waiting...`}
                    </div>
                </LayoutPage>
            </div>)
    }
}
