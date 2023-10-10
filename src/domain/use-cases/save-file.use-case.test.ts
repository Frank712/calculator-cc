import { SaveFile } from "./save-file.use-case";
import fs from "fs";

describe("SaveFileUseCase", () => {
  const customOptions = {
    fileContent: "custom content",
    fileDestination: "custom-outputs/file-destination",
    fileName: "custom-table-name",
  };
  const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

  beforeEach(() => {
    const outputFolderExists = fs.existsSync("outputs");
    if (outputFolderExists) fs.rmSync("outputs", { recursive: true });
    const customOuputFolderExists = fs.existsSync(customFilePath);
    if (customOuputFolderExists) fs.rmSync(customFilePath, { recursive: true });
  });

  afterEach(() => {
    const outputFolderExists = fs.existsSync("outputs");
    if (outputFolderExists) fs.rmSync("outputs", { recursive: true });
    const customOuputFolderExists = fs.existsSync(customFilePath);
    if (customOuputFolderExists) fs.rmSync(customFilePath, { recursive: true });
  });

  test("should save file with default values", () => {
    const saveFile = new SaveFile();
    const deafultFilePath = "outputs/table.txt";
    const options = {
      fileContent: "test content",
    };
    const result = saveFile.execute(options);
    const fileExists = fs.existsSync(deafultFilePath);
    const fileContent = fs.readFileSync(deafultFilePath, { encoding: "utf8" });

    expect(result).toBe(true);
    expect(fileExists).toBe(true);
    expect(fileContent).toBe(options.fileContent);
  });

  test("should save file with default values", () => {
    const saveFile = new SaveFile();
    const result = saveFile.execute(customOptions);
    const fileExists = fs.existsSync(customFilePath);
    const fileContent = fs.readFileSync(customFilePath, { encoding: "utf8" });

    expect(result).toBe(true);
    expect(fileExists).toBe(true);
    expect(fileContent).toBe(customOptions.fileContent);
  });

  test("should return false if directory could not be created", () => {
    const saveFile = new SaveFile();
    const mkdirSpy = jest.spyOn(fs, "mkdirSync").mockImplementation(() => {
      throw new Error("This is a custom error message from testing");
    });
    const result = saveFile.execute(customOptions);
    expect(result).toBe(false);
    mkdirSpy.mockRestore();
  });

  test("should return false if file could not be created", () => {
    const saveFile = new SaveFile();
    const writeFileSpy = jest
      .spyOn(fs, "writeFileSync")
      .mockImplementation(() => {
        throw new Error("This is a writting error message from testing");
      });
    const result = saveFile.execute({ fileContent: "Hello World!" });
    expect(result).toBe(false);
  });
});
