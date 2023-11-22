import os 
from supabase import create_client, Client

url = 'https://fbcvaqziriyvocuskspy.supabase.co'
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiY3ZhcXppcml5dm9jdXNrc3B5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk1NzA3NjUsImV4cCI6MjAwNTE0Njc2NX0.UcO47bPkv6aoS6P-oBvmDpPvkUX9UNr6tiYeD6dwFAw"
supabase: Client = create_client(url, key)