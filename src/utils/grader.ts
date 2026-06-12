export function compareOutputs(userData: any[], expectedData: any[]): { correct: boolean; message?: string } {
  if (!userData || !expectedData) {
    return { correct: false, message: "No data returned to compare." };
  }

  if (userData.length !== expectedData.length) {
    return { 
      correct: false, 
      message: `Row count mismatch. Your query returned ${userData.length} rows, but the expected query has ${expectedData.length} rows.` 
    };
  }

  if (userData.length === 0) {
    return { correct: true };
  }

  // Extract keys and sort them for schema comparison
  const userSample = userData[0];
  const expectedSample = expectedData[0];
  
  const userKeys = Object.keys(userSample);
  const expectedKeys = Object.keys(expectedSample);

  if (userKeys.length !== expectedKeys.length) {
    return {
      correct: false,
      message: `Column count mismatch. Expected ${expectedKeys.length} columns, but your query returned ${userKeys.length} columns.`
    };
  }

  // Row by row, key by key comparison
  for (let i = 0; i < expectedData.length; i++) {
    const userRow = userData[i];
    const expectedRow = expectedData[i];

    for (const expKey of expectedKeys) {
      // Find matching key case-insensitively
      const userKeyMatch = userKeys.find(
        uKey => uKey.toLowerCase() === expKey.toLowerCase()
      );

      if (!userKeyMatch) {
        return {
          correct: false,
          message: `Missing expected column: "${expKey}". Check your SELECT fields.`
        };
      }

      const userVal = userRow[userKeyMatch];
      const expectedVal = expectedRow[expKey];

      // Convert to string and trim for comparison
      const userStr = userVal !== null && userVal !== undefined ? String(userVal).trim() : "NULL";
      const expectedStr = expectedVal !== null && expectedVal !== undefined ? String(expectedVal).trim() : "NULL";

      if (userStr !== expectedStr) {
        // Fallback: Check if numeric values are close enough (e.g., decimals)
        const userNum = parseFloat(userStr);
        const expectedNum = parseFloat(expectedStr);
        
        if (!isNaN(userNum) && !isNaN(expectedNum)) {
          if (Math.abs(userNum - expectedNum) > 0.01) {
            return {
              correct: false,
              message: `Value mismatch at row ${i + 1}, column "${expKey}". Expected "${expectedStr}", got "${userStr}".`
            };
          }
        } else {
          return {
            correct: false,
            message: `Value mismatch at row ${i + 1}, column "${expKey}". Expected "${expectedStr}", got "${userStr}".`
          };
        }
      }
    }
  }

  return { correct: true };
}
