import { BskyAgent } from '@atproto/api'
import { bios } from '../data/Bios';

export async function updateProfileWithAvatar(agent: BskyAgent, imageBlob: Blob): Promise<void> {
  try {
    await agent.upsertProfile(async (existingProfile: any) => {
      const existing = existingProfile ?? {};

      const { data } = await agent.uploadBlob(imageBlob, {
        encoding: imageBlob.type,
      });

      existing.avatar = data.blob;
      return existing;
    });
    console.log('\x1b[32m%s\x1b[0m', 'TPDNE: Profile avatar updated successfully');

  } catch (error) {
    console.error('TPDNE: Error updating profile avatar', error);
  }
}

export async function updateProfileWithBio(agent: BskyAgent): Promise<void> {
  try {
    await agent.upsertProfile(async (existingProfile: any) => {
      const existing = existingProfile ?? {};

      existing.description = bios[Math.floor(Math.random() * bios.length)];

      return existing;
    });
    console.log('\x1b[32m%s\x1b[0m', 'TPDNE: Profile bio updated successfully');

  } catch (error) {
    console.error('TPDNE: Error updating profile bio', error);
  }
}

export async function updateProfileWithWallpaper(agent: BskyAgent, imageBlob: Blob): Promise<void> {
  try {
    await agent.upsertProfile(async (existingProfile: any) => {
      const existing = existingProfile ?? {};

      const { data } = await agent.uploadBlob(imageBlob, {
        encoding: imageBlob.type,
      });

      existing.banner = data.blob;
      return existing;
    });
    console.log('\x1b[32m%s\x1b[0m', 'TPDNE: Profile wallpaper updated successfully');

  } catch (error) {
    console.error('TPDNE: Error updating profile wallpaper', error);
  }
}
