from cairosvg import svg2png

for size in [16, 32, 48, 96, 128]:
    svg2png(
        url="./assets/icon.svg",
        write_to=f"./public/icon/{size}.png",
        output_height=size,
        output_width=size
    )
