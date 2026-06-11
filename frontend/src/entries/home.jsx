import { mountIslands } from "../utils/mount";
import HydrationTest from "../components/HydrationTest";

// The super-smart registry.
// Just map component names to their implementations.
mountIslands({
  HydrationTest
});
