// Export component creation functionality
export {
  createComponent,
} from "./tools/component-creator";

// Export metadata generation functionality
export {
  generateMetadata,
  type GenerateMetadataOptions
} from "./tools/metadata-generator";

// Export dependency analysis functionality
export {
  analyseDependencies,
  analyseRegistrationDependencies,
  type DetectedDependencies
} from "./tools/dependency-analyser";

// Export commands
export { createComponentCommand } from "./commands/create-component";
export { validateCommand } from "./commands/validate";
export { docsCommand } from "./commands/docs";
