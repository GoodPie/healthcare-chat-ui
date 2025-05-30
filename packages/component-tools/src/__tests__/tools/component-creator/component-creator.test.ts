import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createComponent } from '@/tools/component-creator/component-creator';
import * as nodePath from 'node:path';

// Mock the node:fs module
vi.mock('node:fs', () => {
  return {
    existsSync: vi.fn(),
    mkdirSync: vi.fn(),
    writeFileSync: vi.fn()
  };
});

// Import the mocked module
import * as nodeFs from 'node:fs';

// Mock the file content generator
const mockFileContentGenerator = {
  createComponentContent: vi.fn().mockReturnValue('mock component content'),
  createTypesContent: vi.fn().mockReturnValue('mock types content'),
  createCssContent: vi.fn().mockReturnValue('mock css content'),
  createTestContent: vi.fn().mockReturnValue('mock test content'),
  createStoryContent: vi.fn().mockReturnValue('mock story content')
};

// Mock console logger
const mockLogger = {
  log: vi.fn(),
  error: vi.fn(),
  warn: vi.fn(),
  info: vi.fn()
};

describe('createComponent', () => {
  const mockWorkingDir = '/mock/working/dir';

  beforeEach(() => {
    // Reset all mocks before each test
    vi.resetAllMocks();

    // Set up default mock behavior
    vi.mocked(nodeFs.existsSync).mockReturnValue(false);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create a component with default options', async () => {
    // Arrange
    const options = {
      name: 'TestComponent'
    };

    // Act
    const result = await createComponent(
      options,
      mockFileContentGenerator,
      nodeFs,
      nodePath,
      mockWorkingDir,
      mockLogger
    );

    // Assert
    expect(nodeFs.existsSync).toHaveBeenCalledWith(expect.stringContaining('test-component'));
    expect(nodeFs.mkdirSync).toHaveBeenCalledWith(expect.stringContaining('test-component'), { recursive: true });
    expect(nodeFs.writeFileSync).toHaveBeenCalledTimes(5); // Component, index, types, CSS, metadata files
    expect(result.files).toHaveProperty('src/components/test-component/test-component.tsx');
    expect(result.files).toHaveProperty('src/components/test-component/index.ts');
    expect(result.files).toHaveProperty('src/components/test-component/types.ts');
    expect(result.files).toHaveProperty('src/components/test-component/test-component.css');
  });

  it('should throw an error if component directory already exists', async () => {
    // Arrange
    const options = {
      name: 'ExistingComponent'
    };
    vi.mocked(nodeFs.existsSync).mockReturnValue(true);

    // Act & Assert
    await expect(
      createComponent(
        options,
        mockFileContentGenerator,
        nodeFs,
        nodePath,
        mockWorkingDir,
        mockLogger
      )
    ).rejects.toThrow('Component directory already exists');
  });

  it('should create test files when tests option is true', async () => {
    // Arrange
    const options = {
      name: 'ComponentWithTests',
      tests: true
    };

    // Act
    const result = await createComponent(
      options,
      mockFileContentGenerator,
      nodeFs,
      nodePath,
      mockWorkingDir,
      mockLogger
    );

    // Assert
    expect(nodeFs.writeFileSync).toHaveBeenCalledTimes(6); // Component, index, types, CSS, test, metadata files
    expect(result.files).toHaveProperty('src/components/component-with-tests/component-with-tests.test.tsx');
    expect(mockFileContentGenerator.createTestContent).toHaveBeenCalledWith('ComponentWithTests', 'component-with-tests');
  });

  it('should not create CSS files when css option is false', async () => {
    // Arrange
    const options = {
      name: 'ComponentWithoutCss',
      css: false
    };

    // Act
    const result = await createComponent(
      options,
      mockFileContentGenerator,
      nodeFs,
      nodePath,
      mockWorkingDir,
      mockLogger
    );

    // Assert
    expect(nodeFs.writeFileSync).toHaveBeenCalledTimes(4); // Component, index, types, metadata files
    expect(result.files).not.toHaveProperty('src/components/component-without-css/component-without-css.css');
  });

  it('should create story files when stories option is true', async () => {
    // Arrange
    const options = {
      name: 'ComponentWithStories',
      stories: true
    };

    // Act
    const result = await createComponent(
      options,
      mockFileContentGenerator,
      nodeFs,
      nodePath,
      mockWorkingDir,
      mockLogger
    );

    // Assert
    expect(nodeFs.writeFileSync).toHaveBeenCalledTimes(6); // Component, index, types, CSS, story, metadata files
    expect(result.files).toHaveProperty('src/components/component-with-stories/component-with-stories.stories.ts');
    expect(mockFileContentGenerator.createStoryContent).toHaveBeenCalledWith('ComponentWithStories');
  });

  it('should not write files in dry run mode', async () => {
    // Arrange
    const options = {
      name: 'DryRunComponent'
    };

    // Act
    const result = await createComponent(
      options,
      mockFileContentGenerator,
      nodeFs,
      nodePath,
      mockWorkingDir,
      mockLogger,
      { dryRun: true }
    );

    // Assert
    expect(nodeFs.mkdirSync).not.toHaveBeenCalled();
    expect(nodeFs.writeFileSync).not.toHaveBeenCalled();
    expect(result.files).toHaveProperty('src/components/dry-run-component/dry-run-component.tsx');
  });

  it('should use custom output directory when specified', async () => {
    // Arrange
    const options = {
      name: 'CustomDirComponent',
      outputDir: './custom/dir'
    };

    // Act
    const result = await createComponent(
      options,
      mockFileContentGenerator,
      nodeFs,
      nodePath,
      mockWorkingDir,
      mockLogger
    );

    // Assert
    expect(nodeFs.existsSync).toHaveBeenCalledWith(expect.stringContaining('custom/dir/custom-dir-component'));
    expect(nodeFs.mkdirSync).toHaveBeenCalledWith(expect.stringContaining('custom/dir/custom-dir-component'), { recursive: true });
    expect(result.files).toHaveProperty('custom/dir/custom-dir-component/custom-dir-component.tsx');
  });

  it('should create component.json with metadata', async () => {
    // Arrange
    const options = {
      name: 'MetadataComponent',
      description: 'A test component with metadata'
    };

    // Act
    const result = await createComponent(
      options,
      mockFileContentGenerator,
      nodeFs,
      nodePath,
      mockWorkingDir,
      mockLogger
    );

    // Assert
    expect(nodeFs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining('metadata-component/component.json'),
      expect.stringContaining('"description": "A test component with metadata"')
    );
    expect(result.files).toHaveProperty('src/components/metadata-component/component.json');
  });
});
