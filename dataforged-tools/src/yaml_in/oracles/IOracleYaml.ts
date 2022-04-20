import type { IOracle , IOracleContent , IRow , ITableDisplay , OracleCategoryId , OracleTableId } from "@json_out/index.js";
import type { IRequirementsYaml } from "@yaml_in/common/IRequirementsYaml.js";
import type { IOracleUsageYaml } from "@yaml_in/oracles/IOracleUsageYaml.js";
import type { IRowRollYaml, IRowYaml } from "@yaml_in/oracles/IRowYaml.js";
import type { ITemplateOracleYaml } from "@yaml_in/templates/ITemplateOracleYaml.js";
import type { ITemplateTable } from "@yaml_in/templates/ITemplateTableYaml.js";
import type { ITemplateYamlBase } from "@yaml_in/templates/ITemplateYamlBase.js";


export interface IOracleYaml extends  ITemplateYamlBase, Omit<Partial<IOracle>, "Oracles"|"Table"|"Usage"> {
  Name: string;
  Usage?: IOracleUsageYaml | undefined;
  Oracles?: IOracleYaml[] | undefined;
  Requires?: IRequirementsYaml | undefined;
  $id?: OracleTableId;
  Category: OracleCategoryId;
  "Member of"?: IOracle["$id"] | undefined;
  Description?: string | undefined;
  Content?: IOracleContent | undefined;
  Display?: ITableDisplay | undefined;
  Table?: IRowYaml[] | IRowRollYaml[] | IRow[] | undefined;
  _templateInfo?: ITemplateOracleYaml | undefined;
  _templateTable?: ITemplateTable | undefined;
  _childOf?: OracleCategoryId | undefined;
  _parentOf?: string[] | undefined;
}