import { ChallengeRank } from "@json_out/index.js";
import type { NumericOutcome } from "@utils/simulation/NumericOutcomes.js";
import type { ITrack } from "@utils/simulation/Track.js";
import { TICKS_PER_BOX , Track } from "@utils/simulation/Track.js";

/**
 * Enumerates the number of ticks given as a legacy reward for completing some tracks.
 */
export enum LegacyReward {
  Troublesome = 1,
  Dangerous = 2,
  Formidable = 4,
  Extreme = 8,
  Epic = 12,
}

export enum LegacyType {
  Quests,
  Bonds,
  Exploration
}


export interface ILegacyTrack extends ITrack {
  legacy: LegacyType;
}

export enum AdjustLegacyReward {
  Down = -1,
  None = 0,
  Up = 1,
}

export class LegacyTrack extends Track implements ILegacyTrack {
  readonly legacy: LegacyType;
  override applyResult(data: NumericOutcome) {
    throw new Error("NYI");
  }
  mark(rewardRank: ChallengeRank, adjust: AdjustLegacyReward = AdjustLegacyReward.None): this {
    const effectiveRank = rewardRank + adjust;

    if (Object.values(ChallengeRank).includes(effectiveRank)) {
      const ticksToAdd = LegacyReward[(ChallengeRank[effectiveRank] as keyof typeof ChallengeRank)];
      this.ticks += ticksToAdd;
    } else {
      switch (effectiveRank) {
        case 0:
          break;
        case 6:
          this.ticks = LegacyReward.Epic + TICKS_PER_BOX;
          break;
        default:
          throw new Error("Unable to determine how much legacy reward to mark.");
      }
    }
    return this;
  }

  constructor(legacy: LegacyType, ticks: number = 0) {
    super(ticks);
    this.legacy = legacy;
  }
}
