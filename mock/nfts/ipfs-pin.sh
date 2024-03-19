#!/bin/bash
# to run this script
# ./ipfs-pin.sh <filename>

# Define the output JSON file to store CIDs
output_file=$1

# Function to add files to IPFS, get CID, and store CIDs in the output JSON file
add_files_to_ipfs() {
    # Start JSON array
    echo "[" > "$output_file"

    # Flag to check if it's the first entry
    first_entry=true

    # Iterate over each file in the current directory
    for file in *; do
        # Check if file is not a directory
        if [ -f "$file" ]; then
            # Add file to IPFS and capture the CID
            cid=$(ipfs add -Q "$file")

            # Check if CID is not empty
            if [ -n "$cid" ]; then
                # Add comma for entries after the first one
                if [ "$first_entry" = false ]; then
                    echo "," >> "$output_file"
                fi
                # Start JSON object
                echo "{ \"filename\": \"$file\", \"cid\": \"$cid\" }" >> "$output_file"
                
                # Set first entry flag to false
                first_entry=false

                echo "Added $file to IPFS with CID: $cid"
            else
                echo "Failed to add $file to IPFS"
            fi
        fi
    done

    # End JSON array
    echo "]" >> "$output_file"
}

# Add files to IPFS and store CIDs in the output JSON file
add_files_to_ipfs

echo "CIDs stored in $output_file"

