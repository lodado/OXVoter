export default function transformer(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  let shouldAddClientDIImport = true;
  let replacementCount = 0; // 대체 횟수를 기록합니다.

  // Step 1: Find and remove import declarations for each client repository
  root.find(j.ImportDeclaration).forEach((path) => {
    const importPath = path.node.source.value;
    const specifiers = path.node.specifiers;

    // Check if it is already importing CLIENT_DI_REPOSITORY
    if (importPath === "@/DI/index" && specifiers.some((s) => s.imported.name === "CLIENT_DI_REPOSITORY")) {
      shouldAddClientDIImport = false;
    }

    // Define repositories to replace and their replacements
    const repositories = [
      { name: "AuthClientRepository", replacement: "Auth" },
      { name: "EditorClientRepository", replacement: "Editor" },
    ];

    // Remove each repository's import specifier if it exists
    repositories.forEach((repo) => {
      const specifier = specifiers.find((s) => s.type === "ImportSpecifier" && s.imported.name === repo.name);

      if (specifier) {
        // Remove the specific import specifier
        path.node.specifiers = specifiers.filter((s) => s !== specifier);

        // If no other specifiers are left, remove the entire import statement
        if (path.node.specifiers.length === 0) {
          j(path).remove();
        }
      }
    });
  });

  // Step 2: Replace all instances of each repository in the code
  const repositories = [
    { name: "AuthClientRepository", replacement: "Auth" },
    { name: "EditorClientRepository", replacement: "Editor" },
  ];

  repositories.forEach((repo) => {
    root.find(j.Identifier, { name: repo.name }).forEach((identifierPath) => {
      j(identifierPath).replaceWith(
        j.memberExpression(j.identifier("CLIENT_DI_REPOSITORY"), j.identifier(repo.replacement))
      );
      replacementCount++; // 대체가 발생할 때마다 카운트 증가
    });
  });

  // Step 3: Add import { CLIENT_DI_REPOSITORY } from "@/DI/index"; if replacements were made
  if (shouldAddClientDIImport && replacementCount > 0) {
    root
      .get()
      .node.program.body.unshift(
        j.importDeclaration([j.importSpecifier(j.identifier("CLIENT_DI_REPOSITORY"))], j.literal("@/DI/index"))
      );
  }

  return root.toSource();
}
