import { GearCategory } from '@/types';

export const gearCategories: { id: GearCategory; name: string; icon: string }[] = [
  { id: 'Backpacks', name: 'Backpacks', icon: 'backpack' },
  { id: 'Sleeping', name: 'Sleeping', icon: 'bed' },
  { id: 'Clothing', name: 'Clothing', icon: 'shirt' },
  { id: 'Footwear', name: 'Footwear', icon: 'footprints' },
  { id: 'Cooking', name: 'Cooking', icon: 'cooking-pot' },
  { id: 'Electronics', name: 'Electronics', icon: 'smartphone' },
  { id: 'Camping', name: 'Camping', icon: 'tent' },
  { id: 'Hiking', name: 'Hiking', icon: 'mountain' },
  { id: 'Water', name: 'Water', icon: 'droplet' },
  { id: 'Travel', name: 'Travel', icon: 'plane' },
  { id: 'Photography', name: 'Photography', icon: 'camera' },
  { id: 'Books', name: 'Books', icon: 'book' },
  { id: 'Accessories', name: 'Accessories', icon: 'package' },
  { id: 'Other', name: 'Other', icon: 'more-horizontal' },
];