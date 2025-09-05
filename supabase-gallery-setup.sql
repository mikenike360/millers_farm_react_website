-- Note: Using existing millers_farm_images bucket (no custom table needed)

-- Set up RLS policies for millers_farm_images storage bucket
-- First, enable RLS on the storage bucket if not already enabled
-- Note: This might already be enabled, but we'll ensure the policies are correct

-- Allow authenticated users to upload images
CREATE POLICY "Allow authenticated users to upload images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'millers_farm_images' AND auth.role() = 'authenticated');

-- Allow public to view images
CREATE POLICY "Allow public to view images" ON storage.objects
  FOR SELECT USING (bucket_id = 'millers_farm_images');

-- Allow authenticated users to delete images
CREATE POLICY "Allow authenticated users to delete images" ON storage.objects
  FOR DELETE USING (bucket_id = 'millers_farm_images' AND auth.role() = 'authenticated');

-- Allow authenticated users to update images
CREATE POLICY "Allow authenticated users to update images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'millers_farm_images' AND auth.role() = 'authenticated');
