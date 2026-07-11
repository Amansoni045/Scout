import { PlayerProfile } from "../../../types";

export abstract class CodingProfileProvider {
  public abstract readonly platform: string;

  /**
   * Validate if a username is syntactically valid for this platform.
   */
  public abstract validateUsername(username: string): boolean;

  /**
   * Fetches the raw payload from the platform.
   */
  public abstract fetchRawData(username: string): Promise<unknown>;

  /**
   * Normalizes the raw payload into a unified PlayerProfile.
   */
  public abstract normalize(rawData: unknown): PlayerProfile;

  /**
   * Check the API health state.
   */
  public abstract healthCheck(): Promise<boolean>;

  /**
   * Returns a map of features supported by the provider.
   */
  public abstract supportedFeatures(): Record<string, boolean>;
}
