import { StringUtils } from "../../components/v-utils/v-string-utils";
import { Entity } from "./schema-browser";
const commonAttr = [
    "createdOn",
    "modifiedOn",
    "stateCode",
    "statusCode",
    "importSequenceNumber",
    "overriddenCreatedOn",
    "timeZoneRuleVersionNumber",
    "UTCConversionTimeZoneCode"
]
const javaType = (dataType: string) => {
    switch (dataType) {
        case "entityId":
            return "String";
            break;
        case "string":
            return "String";
            break;
        case "integer":
            return "int";
            break;
        case "dateTime":
            return "Date";
            break;
        case "decimal":
            return "double";
            break;
        case "reference":
            return "String"
            break;
        default:
            return "String"
    }
}
export const modelClass = (entity: Entity) => {
    const comments = [
        "/**",
        ` * ${entity.description}`,
        "**/",
    ]
    const packageStatement = "package com.viridium.ghg.model;"
    const importsStatements = [
        "import com.fasterxml.jackson.annotation.JsonInclude;",
        "import com.viridium.ghg.CommonEntity;",
        "import lombok.Data;",
        "import com.viridium.common.MyBuilder;",
        "import javax.persistence.Entity;",
    ];

    const anoontationStmts = [
        "@JsonInclude(JsonInclude.Include.NON_NULL)",
        "@Entity @Data"
    ]

    const className = "public class className extends CommonEntity {"
    const attributeDef = "private $type $name;"

    let attrs = entity.attributes.filter((attribute)=> !commonAttr.includes(attribute.name));
    if(attrs.find((attr) => attr.dataType === "dateTime")) {
        importsStatements.push("import java.sql.Date;");
    }

    let code = [packageStatement, ...importsStatements, ...comments, ...anoontationStmts];
    let classNameStmt = className.replace("className", entity.entityName);
    code.push(classNameStmt);

    attrs.forEach((attribute) => {
        let attrstmt = attributeDef.replace("$type", javaType(attribute.dataType));
        attrstmt = attrstmt.replace("$name", attribute.name);
        code.push("\t" + attrstmt);
    });
    code.push("\tpublic String toString() {\n\n\tMyBuilder mb = new MyBuilder(super.toString())");
    attrs.forEach((attribute, idx) => {
        let attrstmt = attributeDef.replace("$type", javaType(attribute.dataType));
        attrstmt = attrstmt.replace("$name", attribute.name);
        let isLast = idx === attrs.length - 1;
        code.push("\t\t\t.append(" + attribute.name + ")" + (isLast ? ";" : ""));
    });
    code.push("\t\treturn mb.toString();\n\t}\n}");
    return code.join("\n");
}


export const controllerClass = (entity: Entity) => {
    let imports = [
        "package com.viridium.ghg.controller;",
        "import com.viridium.common.BaseController;",
        "import org.springframework.beans.factory.annotation.Autowired;",
        "import org.springframework.web.bind.annotation.*;",
        "import javax.ws.rs.QueryParam;",
        `import com.viridium.ghg.model.${entity.entityName};`,
        `import com.viridium.ghg.service.${entity.entityName}Repo;`
    ]

    let annotations = [
        "@RestController",
        "@RequestMapping(\"ghg\")"
    ]

    let code = [...imports, ...annotations];

    let serviceName = StringUtils.plural(entity.entityName.toLocaleLowerCase());

    let repoName = StringUtils.firstLower(entity.entityName) + "Repo";
    code.push(`public class ${entity.entityName}Controller extends BaseController {`);

    code.push("    @Autowired");
    code.push(`    ${entity.entityName}Repo ${repoName};`);


    let methtods = `    @GetMapping("/${serviceName}")
    public Iterable<${entity.entityName}> search(@QueryParam("text") String text) {
        Iterable<${entity.entityName}> result;
        if (text != null) {
            result = ${repoName}.findByTextFree(text);
        } else {
            result = ${repoName}.findAll();
        }
        return result;
    }

    @PostMapping("/${serviceName}")
    public ${entity.entityName} add(@RequestBody ${entity.entityName} entity) {

        ${repoName}.save(entity);
        return entity;
    }

    @GetMapping("/${serviceName}/{id}")
    public ${entity.entityName} get(@PathVariable("id") String id) {
        try {
            return ${repoName}.findById(id).get();
        } catch (Exception e) {
            throw handleException(id, e);
        }
    }

    @PutMapping("/${serviceName}/{id}")
    public ${entity.entityName} update(@PathVariable("id") String id, @RequestBody ${entity.entityName} rest) {
       // ${repoName}.
         return  rest;
    }

    @DeleteMapping("/${serviceName}/{id}")
    public void delete(@PathVariable("id") String id) {
        try {
            ${repoName}.deleteById(id);
        } catch (Exception e) {
            throw handleException(id, e);
        }
    }`

    code.push(methtods);
    code.push("}")
    return code.join("\n");
}

export const serviceClass = (entity: Entity) => {
    let imports = [
        "package com.viridium.ghg.service;",
        `import com.viridium.ghg.model.${entity.entityName};`,
        "import org.springframework.data.domain.Page;",
        "import org.springframework.data.domain.Pageable;",
        "import org.springframework.data.jpa.repository.JpaSpecificationExecutor;",
        "import org.springframework.data.jpa.repository.Query;",
        "import org.springframework.data.repository.CrudRepository;",
        "import java.util.List;"
    ]
    let code = [...imports];
    let methtods = ` public interface ${entity.entityName}Repo extends CrudRepository<${entity.entityName}, String>, JpaSpecificationExecutor<${entity.entityName}> {
        Page<${entity.entityName}> findByNameLike(String name, Pageable pageable);
        @Query("select u from ${entity.entityName} u where lower(u.text) like lower(concat('%', ?1,'%'))")
        List<${entity.entityName}> findByTextFree(String text);
    }`
    code.push(methtods);
    return code.join("\n");
}

