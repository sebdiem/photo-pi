from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
from os import listdir
from os.path import isfile, join, splitext
import json

i = 0
PATH = "/Users/Diem/Dropbox/Camera\xc2\xa0Uploads/"

class MyHandler(BaseHTTPRequestHandler):
    IMAGE_FILES = []
    def do_OPTIONS(self):           
        self.send_response(200, "ok")       
        self.send_header('Access-Control-Allow-Origin', '*')                
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

    def do_GET(self):
        new_img_files = MyHandler.update_img_files()
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')                
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(new_img_files))

    @staticmethod
    def update_img_files():
        img_files = [f for f in listdir(PATH) if isfile(join(PATH, f))
                                              if MyHandler.is_image_extension(splitext(f)[1])]
        start = len(MyHandler.IMAGE_FILES)
        for img in img_files:
            if img not in MyHandler.IMAGE_FILES:
                MyHandler.IMAGE_FILES.append(img)
        return MyHandler.IMAGE_FILES[start:]


    @staticmethod
    def is_image_extension(ext):
        return ext in ('.jpg', '.jpeg', '.bmp', '.tiff', '.png')

def main():
    try:
        server = HTTPServer(('', 8012), MyHandler)
        print 'started httpserver...'
        server.serve_forever()
    except KeyboardInterrupt:
        print '^C received, shutting down server'
        server.socket.close()

if __name__ == '__main__':
    main()
