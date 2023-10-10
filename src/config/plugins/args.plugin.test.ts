const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];
  const { yarg } = await import("./args.plugin");
  return yarg;
};

describe("Test args.plugins.ts", () => {
  const originalArgv = process.argv;

  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  test("should return default values", async () => {
    const argv = await runCommand(["-b", "5"]);
    console.log(argv);

    expect(argv).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: "multiplication-table",
        d: "outputs",
      })
    );
  });

  test("should return custom values", async () => {
    const baseValue = "10";
    const limitValue = "25";
    const showValue = "true";
    const nameValue = "fileNameTest";
    const directoryValue = "outputTest";
    const argv = await runCommand([
      "-b",
      baseValue,
      "-l",
      limitValue,
      "-s",
      "-n",
      nameValue,
      "-d",
      directoryValue,
    ]);
    console.log(argv);

    expect(argv).toEqual(
      expect.objectContaining({
        b: parseInt(baseValue),
        l: parseInt(limitValue),
        s: true,
        n: nameValue,
        d: directoryValue,
      })
    );
  });
});
