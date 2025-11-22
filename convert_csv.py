import pandas as pd
import json

# Read the CSV
df = pd.read_csv('large_sales_data.csv')

# Convert to list of dictionaries
data = df.to_dict('records')

# Write to TypeScript file
with open('src/services/salesData.ts', 'w') as f:
    f.write('// Auto-generated from large_sales_data.csv\n\n')
    f.write('export interface SalesRecord {\n')
    f.write('  Transaction_ID: string;\n')
    f.write('  Date: string;\n')
    f.write('  Customer_Name: string;\n')
    f.write('  Region: string;\n')
    f.write('  Industry: string;\n')
    f.write('  Product: string;\n')
    f.write('  Quantity: number;\n')
    f.write('  Unit_Price: number;\n')
    f.write('  Total_Value: number;\n')
    f.write('  Sales_Rep: string;\n')
    f.write('  Lead_Source: string;\n')
    f.write('  Deal_Stage: string;\n')
    f.write('  Probability: number;\n')
    f.write('}\n\n')
    f.write('export const salesData: SalesRecord[] = ')
    f.write(json.dumps(data, indent=2))
    f.write(';\n')

print("Converted CSV to TypeScript file: src/services/salesData.ts")
