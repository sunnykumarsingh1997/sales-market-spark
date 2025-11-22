import pandas as pd
import random
from faker import Faker
from datetime import datetime, timedelta

fake = Faker()

# Configuration
ROWS = 500
REGIONS = ['North America', 'Europe', 'Asia Pacific', 'LATAM']
INDUSTRIES = ['Tech', 'Finance', 'Manufacturing', 'Healthcare', 'Retail']
PRODUCTS = {
    'SaaS License Basic': 500,
    'SaaS License Pro': 1200,
    'Enterprise Pack': 50000,
    'Consulting Hours': 150,
    'AI Module Addon': 15000
}
STAGES = ['Discovery', 'Qualifying', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost']
SOURCES = ['LinkedIn', 'Website', 'Referral', 'Cold Call', 'Event']
REPS = ['Sarah Miller', 'David Kim', 'James Carter', 'Elena Rodriguez']

data = []

for i in range(ROWS):
    # Transaction Info
    txn_id = f"TXN-{1000 + i}"
    # Random date within last 90 days
    date_obj = datetime.now() - timedelta(days=random.randint(0, 90))
    date_str = date_obj.strftime('%Y-%m-%d')
    
    prod_name = random.choice(list(PRODUCTS.keys()))
    unit_price = PRODUCTS[prod_name]
    qty = random.randint(1, 20)
    total_val = unit_price * qty
    
    stage = random.choice(STAGES)
    # Assign probability based on stage
    if stage == 'Closed Won': prob = 100
    elif stage == 'Closed Lost': prob = 0
    elif stage == 'Negotiation': prob = 75
    elif stage == 'Proposal': prob = 50
    else: prob = 20
    
    row = {
        'Transaction_ID': txn_id,
        'Date': date_str,
        'Customer_Name': fake.company(),
        'Region': random.choice(REGIONS),
        'Industry': random.choice(INDUSTRIES),
        'Product': prod_name,
        'Quantity': qty,
        'Unit_Price': unit_price,
        'Total_Value': total_val,
        'Sales_Rep': random.choice(REPS),
        'Lead_Source': random.choice(SOURCES),
        'Deal_Stage': stage,
        'Probability': prob,
    }
    data.append(row)

# Save to CSV
df = pd.DataFrame(data)
df.to_csv('large_sales_data.csv', index=False)
print(f"Generated {ROWS} rows of sales data to 'large_sales_data.csv'")
