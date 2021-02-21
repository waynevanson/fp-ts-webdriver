/**
 * An namespace for all the types within the file.
 *
 * Expected to be exported from the main entry point
 *
 * @since 4.0.0
 */
export type {
  /**
   * @since 4.0.0
   */
  JsonArray,
  /**
   * @since 4.0.0
   */
  Json,
  /**
   * @since 4.0.0
   */
  JsonObject,
  /**
   * @since 4.0.0
   */
  JsonPrimitive,
  /**
   * @since 4.0.0
   */
  Element,
  /**
   * @since 4.0.0
   */
  NullAsVoid,
  /**
   * @since 4.0.0
   */
  Literal,
  /**
   * @since 4.0.0
   */
  Null,
  /**
   * @since 4.0.0
   */
  Session,
  /**
   * @since 4.0.0
   */
  Status,
  /**
   * @since 4.0.0
   */
  Timeouts,
  /**
   * @since 4.0.0
   */
  Success,
} from "../../codecs"

export type {
  /**
   * @since 4.0.0
   */
  Action,
  /**
   * @since 4.0.0
   */
  Actions,
  /**
   * @since 4.0.0
   */
  NullAction,
  /**
   * @since 4.0.0
   */
  PointerParameters,
  /**
   * @since 4.0.0
   */
  ActionItemKey,
  /**
   * @since 4.0.0
   */
  ActionItemKeyUpDown,
  /**
   * @since 4.0.0
   */
  ActionItemPause,
  /**
   * @since 4.0.0
   */
  ActionItemPointer,
  /**
   * @since 4.0.0
   */
  ActionItemPointerCancel,
  /**
   * @since 4.0.0
   */
  ActionItemPointerMove,
  /**
   * @since 4.0.0
   */
  ActionItemPointerUpDown,
  /**
   * @since 4.0.0
   */
  ActionSequence,
  /**
   * @since 4.0.0
   */
  KeyAction,
  /**
   * @since 4.0.0
   */
  PointerAction,
} from "./actions"

export {
  /**
   * @since 4.0.0
   */
  NewSession,
} from "./parameters"

export {
  /**
   * @since 4.0.0
   */
  Capabilities,
  /**
   * @since 4.0.0
   */
  ExtensionCapabilities,
  /**
   * @since 4.0.0
   */
  RequiredCapabilities,
  /**
   * @since 4.0.0
   */
  StandardCapabilities,
} from "./processing-capabilities"

export {
  /**
   * @since 4.0.0
   */
  ProxyTypePac,
  /**
   * @since 4.0.0
   */
  ProxyTypeManual,
  /**
   * @since 4.0.0
   */
  ProxyConfiguration,
  /**
   * @since 4.0.0
   */
  ProxyConfigurationBase,
  /**
   * @since 4.0.0
   */
  ProxyConfigurationManual,
  /**
   * @since 4.0.0
   */
  ProxyConfigurationPac,
  /**
   * @since 4.0.0
   */
  ProxyType,
  /**
   * @since 4.0.0
   */
  ProxyTypeBase,
} from "./proxy-configuration"

export * from "./models"
