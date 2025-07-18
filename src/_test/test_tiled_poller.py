# import asyncio
# from unittest.mock import AsyncMock

import numpy
import pytest

from arroyosas.schemas import (  # GISAXSRawStart,; GISAXSRawStop,
    RawFrameEvent,
    SerializableNumpyArrayModel,
)
from arroyosas.tiled.tiled_poller import unsent_frame_numbers

# import pytest_asyncio
# from arroyopy.operator import Operator
# from arroyopy.schemas import NumpyArrayModel


@pytest.fixture
def events():
    event_list = []
    num_events = 2
    for frame_num in range(num_events):
        image = numpy.random.rand(10, 20).astype(numpy.uint8)
        image = SerializableNumpyArrayModel(array=image)
        event = RawFrameEvent(image=image, frame_number=frame_num)
        event_list.append(event)
    return event_list


# @pytest.mark.asyncio
# async def test_operator_process_called_with_foobar(events, client):
#     operator_mock = AsyncMock(spec=Operator)

#     # Define message sequence
#     messages = [
#         GISAXSRawStart(width=5, height=6, data_type="uint8", tiled_url="foo"),  # First message
#         events[0],
#         events[1],  # 2 RawEvent messages
#         GISAXSRawStop(num_frames=2),  # Last message
#     ]

#     # Mock operator.process() to return these messages in order
#     operator_mock.process.side_effect = messages

#     listener = TiledPollingFrameListener(
#         operator_mock, beamline_runs_tiled=client, tiled_frame_segments=["a", "b"], poll_paust_sec=0.1
#     )

#     received_messages = []

#     async def mock_listen():
#         for _ in range(len(messages)):  # Simulate each polling cycle
#             result = await listener.operator.process()
#             received_messages.append(result)
#             await asyncio.sleep(listener.poll_paust_sec)

#     listener.listen = mock_listen  # Replace listen() with mock_listen

#     # Run start() for a short time
#     async def run_listener():
#         await asyncio.sleep(0.7)  # Allow enough iterations
#         await listener.stop()

#     # Start listener and stop after a short time
#     task = asyncio.create_task(listener.start())
#     await asyncio.wait_for(run_listener(), timeout=1)
#     await task  # Ensure the task completes

#     # Assertions on message sequence
#     assert isinstance(received_messages[0], GISAXSRawStart)
#     assert all(isinstance(msg, GISAXSRawEvent) for msg in received_messages[1:6])
#     assert isinstance(received_messages[6], GISAXSRawStop)
#     assert len(received_messages) == 7  # Ensure exactly 7 messages received


def test_unsent_frames():
    frames = [0, 1, 2, 5]  # Three, Sir! Three!
    that_rabbits_dynamite = unsent_frame_numbers(frames, 8) == [3, 4, 6, 7, 8]
    assert that_rabbits_dynamite
