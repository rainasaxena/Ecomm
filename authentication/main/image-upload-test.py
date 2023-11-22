from storage3 import create_client

if __name__ == '__main__':
    url = 'https://cdztpolwphkawmvkmrei.supabase.co/storage/v1'
    key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkenRwb2x3cGhrYXdtdmttcmVpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODgzNTY2OSwiZXhwIjoyMDE0NDExNjY5fQ.UHG5X_rjQ7k7OBFs2RnugvhmaVstsWk-3ehG-3UtlOQ"
    headers = {"apiKey": key, "Authorization": f"Bearer {key}"}

    # pass in is_async=True to create an async client
    storage_client = create_client(url, headers, is_async=False)

    with open('main/images/user_pfp/IMG20231028123422.jpg', 'rb') as img:
        print('done')
        storage_client.from_('Images').upload(file=img, path='user_pfp/img.jpg')