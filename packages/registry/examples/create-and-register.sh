#!/bin/bash

# Example script demonstrating how to use the component registration tool

# Create a new component
echo "Creating a new component..."
yarn registry create-component ExampleButton \
  --output-dir ./examples/components \
  --description "An example button component" \
  --tests \
  --stories

# Wait for user to make changes
echo ""
echo "Component created at ./examples/components/example-button"
echo "You can now make changes to the component if desired."
echo "Press Enter to continue with validation..."
read

# Validate the component
echo ""
echo "Validating the component..."
yarn registry validate ./examples/components/example-button

# Generate documentation
echo ""
echo "Generating documentation..."
yarn registry docs ./examples/components/example-button

# Register the component
echo ""
echo "Registering the component..."
yarn registry register ./examples/components/example-button \
  --description "An example button component with custom description" \
  --local-only

echo ""
echo "Component workflow complete!"
echo "The component has been created, validated, documented, and registered."
