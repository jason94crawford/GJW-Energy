import asyncio
import base64
import os
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv("/app/backend/.env")

OUT = "/app/frontend/public/images/infographics"
os.makedirs(OUT, exist_ok=True)

STYLE = (
    "Dark moody night-time isometric 3D architectural render, very dark charcoal scene on a near-black background (#0A0A0C), "
    "dim ambient light, matte dark grey and graphite buildings, deep navy-blue solar panels with a subtle sheen, "
    "warm orange (#D97725) accent glow and rim lighting, thin glowing orange dashed energy-flow lines running from the "
    "solar panels and the battery container into the building they power, soft shadows, cinematic, high detail, "
    "wide landscape composition, no text, no labels, no watermark."
)

SCENES = {
    "manufacturing": (
        "A modern industrial factory warehouse with a large flat roof covered in neat rows of dark navy solar panels, "
        "maintenance walkways between the panel rows, thin guardrails along the roof edges, a roof access ladder on the "
        "side wall, a loading dock with white box trucks and orange ground safety markings, two battery energy storage "
        "containers beside the building with an orange status glow, and two factory chimney stacks emitting soft "
        "light-grey smoke plumes. " + STYLE
    ),
    "retail": (
        "A contemporary shopping mall building with a flat roof covered in dark navy solar panel rows, a front parking "
        "lot with elegant solar panel carport canopies shading rows of parked cars, small EV charging posts beside some "
        "cars, and a battery energy storage container near the building with an orange status glow. " + STYLE
    ),
    "healthcare": (
        "A modern hospital building at night with a rooftop helipad marked with a circle and H and a small helicopter, "
        "rows of dark navy solar panels on the remaining flat roof, thin guardrails along the roof edge, a roof access "
        "ladder, a battery energy storage annex beside the building with an orange status glow, a subtle orange medical "
        "cross on the facade, and warm light in a few windows. " + STYLE
    ),
    "hospitality": (
        "A luxury eco safari lodge at night with several villas with pitched roofs and warm glowing windows, palm trees "
        "and natural landscaping, a ground-mount dark navy solar panel array on a clearing behind the lodge, two battery "
        "energy storage containers, and a compact enclosed silent-type diesel generator unit with a dark canopy standing "
        "beside the battery containers, switched off and quiet. " + STYLE
    ),
    "agri": (
        "A flower farm at night with long curved greenhouse tunnels dimly lit in rows, a large ground-mount dark navy "
        "solar panel array mounted on slim metal rammed pole foundations, a packhouse cold-store building, a battery "
        "energy storage container with an orange status glow, and dark green crop rows in the foreground, overall a "
        "darker dusk tone. " + STYLE
    ),
}


async def gen(name, prompt):
    chat = LlmChat(
        api_key=os.getenv("EMERGENT_LLM_KEY"),
        session_id=f"gjw-infographic-v2-{name}",
        system_message="You are a helpful AI assistant",
    )
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    text, images = await chat.send_message_multimodal_response(UserMessage(text=prompt))
    if images:
        path = os.path.join(OUT, f"{name}.png")
        with open(path, "wb") as f:
            f.write(base64.b64decode(images[0]["data"]))
        print(f"OK {name}: {os.path.getsize(path)} bytes", flush=True)
    else:
        print(f"NO IMAGE for {name}: {text[:120]}", flush=True)


async def main():
    for name, prompt in SCENES.items():
        try:
            await gen(name, prompt)
        except Exception as e:
            print(f"ERROR {name}: {e}", flush=True)


asyncio.run(main())
print("ALL DONE", flush=True)
