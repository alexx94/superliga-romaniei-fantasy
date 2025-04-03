import pandas as pd

# Read the existing CSV file
csv_file = "romanian_league_player_stats.csv"  # Replace with your CSV filename
df = pd.read_csv(csv_file)

# Identify the player name column - it might be called 'player', 'name', or something similar
# Check what column contains player names in your data
player_column = 'player'  # Change this to match your column name

# Create a new column order with player and team_name first
all_columns = df.columns.tolist()

if 'matches' in all_columns:
    print("da")
    all_columns.remove('matches')

# Remove player and team_name from the list (if they exist)
columns_to_move = [player_column, 'team_name']
for col in columns_to_move:
    if col in all_columns:
        all_columns.remove(col)

# Create new column order with player and team_name first
new_column_order = columns_to_move + all_columns

# Reorder the DataFrame
df = df[new_column_order]

# Convert float columns to integer (for PostgreSQL)
for col in df.columns:
    if col == 'age':
        df[col] = df[col].astype(str).where(df[col].notna(), None)  # Ensure NaN stays NaN
        df[col] = df[col].apply(lambda x: x[:2] if pd.notna(x) else x)  # Slice only non-NaN values
        df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0).astype(int)

    # Skip non-numeric columns and the columns we want to keep as is
    if col in ['player', 'team_name', 'team_url'] or not pd.api.types.is_numeric_dtype(df[col]):
        continue

    try:
        # Replace any NaN values with 0 before converting to int
        df[col] = df[col].fillna(0).astype(int)
    except Exception as e:
        print(f"Could not convert column {col} to integer: {e}")


# Save to a new CSV file (or overwrite the original)
output_file = "romanian_league_player_stats_reordered.csv"
df.to_csv(output_file, index=False, encoding="utf-8")

print(f"CSV file with reordered columns saved to {output_file}")