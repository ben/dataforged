
import t from 'ts-runtime/lib';

import yaml from "js-yaml";
import fs from "fs";
import Asset from "../types/assets/Asset";
import ISource from "../types/general/interfaces/ISource";
import jsonpath from "jsonpath";
import { AssetConditionMeterType } from "../types/general/ConditionMeter";
import IAssetData from '../types/assets/interfaces/IAssetData';
import badJsonError from './logging/badJsonError';
import getYamlFiles from './io/getYamlFiles';
import buildLog from './logging/buildLog';

const assetPath = getYamlFiles().find(item => item.toString().match(/assets\.yaml$/)) as fs.PathLike;

interface assetDataRoot {
  Name: string;
  Source: ISource;
  Assets: IAssetData[];
}

export default function buildAssets() {
  const data = fs.readFileSync(assetPath, { encoding: "utf-8" });
  const json = yaml.load(data) as assetDataRoot;
  const result = json.Assets.map((assetData) => {
    return new Asset(assetData, json.Source);
  });
  result.forEach(asset => {
    jsonpath.apply(asset, "$..Stat", stat => {
      if (stat == "Asset Condition Meter") {
        if (!asset["Condition Meter"]) {
          throw badJsonError(buildAssets, stat, "Asset references asset condition meter, but it doesn't have one.")
        }
        buildLog(buildAssets, `Adding reference for ${asset["Condition Meter"]?.$id}`);
        stat = asset["Condition Meter"]?.$id;
      }
      return stat as AssetConditionMeterType;
    });
    return asset;
  });
  return result;
}