      function generateCommand() {
        // 获取用户输入
        const inputFileName = document.getElementById('inputFileName').value;
        const outputFileName = document.getElementById('outputFileName').value;
        const overwrite = document.getElementById('overwrite').checked;
        const speed = document.getElementById('speed').value;
        const videoCodec = document.getElementById('videoCodec').value;
        const width = document.getElementById('videoWidth').value;
        const height = document.getElementById('videoHeight').value;
        const rotation = document.getElementById('rotation').value;
        const flipHorizontal = document.getElementById('flipHorizontal').checked;
        const flipVertical = document.getElementById('flipVertical').checked;
        const crf = document.getElementById('crf').value;
        const preset = document.getElementById('preset').value;
        const audioCodec = document.getElementById('audioCodec').value;
        const sampleRate = document.getElementById('sampleRate').value;

        // 构建 FFmpeg 命令
        let command = ``;

        // 覆盖
        if (overwrite) {
          command = `ffmpeg -y -i ${inputFileName} `;
        } else {
          command = `ffmpeg -i ${inputFileName} `;
        }

        // 添加速度参数
        if (speed) {
          command += `-filter:a "atempo=${speed}" `;
        }

        // 视频编码
        if (videoCodec !== 'copy') {
          command += `-c:v ${videoCodec} `;
        }

        // 分辨率
        if (width && height) {
          command += `-vf "scale=${width}:${height}" `;
        }

        // 旋转
        if (rotation !== '0') {
          command += `${rotation === '90' ? '-display_rotation 90' : rotation === '180' ? '-display_rotation 180' : '-display_rotation 270'} `;
        }

        // 水平翻转和竖直翻转
        if (flipHorizontal) {
          command += `-display_hflip `;
        }
        if (flipVertical) {
          command += `-display_vflip `;
        }

        // 恒定率系数（CRF）
        if (crf) {
          command += `-crf ${crf} `;
        }

        // 预设
        if (preset !== 'null') {
          command += `-preset ${preset} `;
        }

        // 音频编码
        if (audioCodec !== 'copy') {
          command += `-c:a ${audioCodec} -ar ${sampleRate} `;
        }

        // 输出文件名
        command += `${outputFileName}`;

        // 显示命令
        document.querySelector('code').textContent = command.trim();
      }

      // 为所有输入元素添加事件监听器
      window.onload = () => {
        const inputs = document.querySelectorAll('input, select');
        inputs.forEach(input => {
          input.addEventListener('change', generateCommand);
        });
        generateCommand(); // 初始化输出
      };