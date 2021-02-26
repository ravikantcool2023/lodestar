import {join} from "path";
import {expect} from "chai";

import {config} from "@chainsafe/lodestar-config/minimal";
import {describeDirectorySpecTest, InputType} from "@chainsafe/lodestar-spec-test-util/lib/single";
import {IStateTestCase} from "../../../utils/specTestTypes/stateTestCase";
import {SPEC_TEST_LOCATION} from "../../../utils/specTestCases";
import {phase0} from "@chainsafe/lodestar-beacon-state-transition";

describeDirectorySpecTest<IStateTestCase, phase0.BeaconState>(
  "process randao mixes reset minimal",
  join(SPEC_TEST_LOCATION, "tests/minimal/phase0/epoch_processing/randao_mixes_reset/pyspec_tests"),
  (testcase) => {
    const state = testcase.pre;
    phase0.processRandaoMixesReset(config, state);
    return state;
  },
  {
    inputTypes: {
      pre: InputType.SSZ,
      post: InputType.SSZ,
    },
    sszTypes: {
      pre: config.types.phase0.BeaconState,
      post: config.types.phase0.BeaconState,
    },
    getExpected: (testCase) => testCase.post,
    expectFunc: (testCase, expected, actual) => {
      expect(config.types.phase0.BeaconState.equals(actual, expected)).to.be.true;
    },
  }
);