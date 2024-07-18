//login and signup layout
type childprop = {
    children: React.ReactNode
}


export default function RootLayout({ children }: childprop) {
    return (
        <html>
            <body>
                    {children}
            </body>
        </html>
    )

}