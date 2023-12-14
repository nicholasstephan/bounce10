<script>
  import { goto } from '$app/navigation';
  import auth from '$lib/stores/auth';
	import { createActivity, getActivity } from '$lib/stores/activities';
	import { onMount } from 'svelte';
  
  onMount(async () => {
    let activities = await getActivity($auth.id, 'fish');
    if(!activities.length) {
      await createActivity({
        type: "fish",
        name: "F.I.S.H.",
        f: "",
        i: "",
        s: "",
        h: "",
      });
    }
    goto('/profile/fish/activity/f', { replaceState: true });
  });
</script>