// The test account (#309): an anonymous driver full of sample lap times
// and speeds (src/data/fixtures/testAccountLaps.ts), for admins to try the
// app out with. An admin switches to it from the menu, and back the same way;
// while it's on, their own laps everywhere are the test account's instead.
// The laps function takes this id from admins only.
//
// Not a Netlify Identity id (those are UUIDs), so it can't be anyone's.
export const TEST_DRIVER_ID = 'test-account'
